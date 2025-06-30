// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// Facets
import {LiquidityFacet} from "../facets/LiquidityFacet.sol";
import {OracleFacet} from "../facets/OracleFacet.sol";

// Libraries
import {SAMMStorageLib} from "../libraries/SAMMStorage.sol";
import {LiquidityStorageLib} from "../libraries/LiquidityStorage.sol";
import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";
import {StochasticMath} from "../libraries/StochasticMath.sol";

import {VRFConsumerBaseV2Plus} from "@chainlink/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import {VRFV2PlusClient} from "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";
import {IVRFCoordinatorV2Plus} from "@chainlink/contracts/src/v0.8/vrf/dev/interfaces/IVRFCoordinatorV2Plus.sol";

contract SAMMFacet is ReentrancyGuard, VRFConsumerBaseV2Plus {
    uint256 private constant PRECISION = 1e18;
    uint256 private constant SECONDS_PER_YEAR = 31536000;
    uint256 private constant BASE_FEE_BPS = 5; // 0.05%
    uint256 private constant FEE_DENOMINATOR = 10000;

    // VRF Constants
    uint32 constant CALLBACK_GAS_LIMIT = 300000;
    uint16 constant REQUEST_CONFIRMATIONS = 3;
    uint32 constant NUM_WORDS = 1;
    bytes32 immutable s_keyHash;
    uint256 immutable s_subscriptionId;
    IVRFCoordinatorV2Plus immutable COORDINATOR;

    using SafeERC20 for IERC20;

    event SwapInitiated(uint256 indexed requestId, address indexed user, address tokenIn, uint256 amountIn);
    event SwapCompleted(uint256 indexed requestId, uint256 amountOut, uint256 feeCharged);

    constructor(address vrfCoordinator, bytes32 keyHash, uint256 subscriptionId)
        VRFConsumerBaseV2Plus(vrfCoordinator)
    {
        s_keyHash = keyHash;
        s_subscriptionId = subscriptionId;
        COORDINATOR = IVRFCoordinatorV2Plus(vrfCoordinator);
    }

    function swap(bytes8 poolId, address tokenIn, uint256 amountIn) external nonReentrant returns (uint256) {
        SAMMStorageLib.SAMMStorage storage ss = SAMMStorageLib.sammStorage();

        LiquidityFacet liquidityFacet = LiquidityFacet(ss.itoProxy);

        address user = msg.sender;

        // Validate Pool
        liquidityFacet.poolExists(poolId);

        require(amountIn > 0, "INVALID_AMOUNT");

        // Transfer tokens from user
        IERC20(tokenIn).safeTransferFrom(user, address(this), amountIn);

        // Request Randomness from VRF.
        uint256 requestId = COORDINATOR.requestRandomWords(
            VRFV2PlusClient.RandomWordsRequest({
                keyHash: s_keyHash,
                subId: s_subscriptionId,
                requestConfirmations: REQUEST_CONFIRMATIONS,
                callbackGasLimit: CALLBACK_GAS_LIMIT,
                numWords: NUM_WORDS,
                extraArgs: VRFV2PlusClient._argsToBytes(VRFV2PlusClient.ExtraArgsV1({nativePayment: false}))
            })
        );

        // Store swap request
        ss.swapRequests[requestId] = SAMMStorageLib.SwapRequest({
            user: user,
            poolId: poolId,
            tokenIn: tokenIn,
            amountIn: amountIn,
            amountOut: 0,
            timestamp: block.timestamp,
            isFulfilled: false,
            fee: 0,
            isError: false,
            errorCode: 0
        });

        emit SwapInitiated(requestId, user, tokenIn, amountIn);

        return requestId;
    }

    function fulfillRandomWords(uint256 requestId, uint256[] calldata randomWords) internal override {
        SAMMStorageLib.SAMMStorage storage ss = SAMMStorageLib.sammStorage();
        SAMMStorageLib.SwapRequest storage request = ss.swapRequests[requestId];

        // Validate request
        require(request.isFulfilled == false, "REQUEST_ALREADY_FULFILLED");

        // Get market data
        OracleFacet oracleFacet = OracleFacet(ss.itoProxy);
        uint256 price = oracleFacet.getLatestPrice(request.poolId);
        uint256 volatility = oracleFacet.getLatestVolatility(request.poolId);

        // Calculate time delta in years
        uint256 timeDelta = _calculateTimeDelta(request.poolId);

        // Convert random numbers to standard normal distribution
        uint256 scaled = randomWords[0] % (1e18);
        int256 z0 = StochasticMath.probit(int256(scaled));

        // Calculate stochastic price factor
        int256 exponent = _calculateExponent(volatility, timeDelta, z0);

        uint256 priceFactor = _exp(exponent);

        // Calculate effective price
        uint256 effectivePrice = _calculateEffectivePrice(price, priceFactor, request.tokenIn, request.poolId);

        // Execute swap with stochastic price
        _executeSwap(requestId, effectivePrice, volatility);
    }

    function _executeSwap(uint256 requestId, uint256 effectivePrice, uint256 volatility) private {
        SAMMStorageLib.SAMMStorage storage ss = SAMMStorageLib.sammStorage();
        SAMMStorageLib.SwapRequest storage request = ss.swapRequests[requestId];
        LiquidityFacet liquidityFacet = LiquidityFacet(ss.itoProxy);
        LiquidityStorageLib.PoolConfig memory pool = liquidityFacet.getPoolConfig(request.poolId);
        LiquidityStorageLib.PoolState memory poolState = liquidityFacet.getPoolState(request.poolId);

        uint256 amountOut;
        uint256 fee;

        if (request.tokenIn == pool.tokenA) {
            amountOut = (request.amountIn * effectivePrice) / PRECISION;

            // Apply dynamic fee
            fee = _calculateFee(request.amountIn, amountOut, volatility, request.poolId);
            uint256 amountOutAfterFee = amountOut - fee;

            // Update Pools and Transfer tokens to user
            require(amountOutAfterFee >= 0, "INSUFFICIENT_OUTPUT");
            require(amountOutAfterFee <= poolState.reserveB, "INSUFFICIENT_LIQUIDITY");

            liquidityFacet._updatePoolAndTransferAfterSwap(
                request.poolId, request.tokenIn, request.amountIn, pool.tokenB, amountOutAfterFee, request.user
            );
        } else {
            amountOut = (request.amountIn * effectivePrice) / PRECISION;

            // Apply dynamic fee
            fee = _calculateFee(request.amountIn, amountOut, volatility, request.poolId);
            uint256 amountOutAfterFee = amountOut - fee;

            require(amountOutAfterFee > 0, "INSUFFICIENT_OUTPUT");
            require(amountOutAfterFee <= poolState.reserveA, "INSUFFICIENT_LIQUIDITY");

            liquidityFacet._updatePoolAndTransferAfterSwap(
                request.poolId, request.tokenIn, request.amountIn, pool.tokenA, amountOutAfterFee, request.user
            );
        }

        request.amountOut = amountOut;
        request.fee = fee;
        request.isFulfilled = true;
    }

    function _calculateFee(uint256 amountIn, uint256 amountOut, uint256 volatility, bytes8 poolId)
        private
        view
        returns (uint256)
    {
        // SAMMStorageLib.SAMMStorage storage ss = SAMMStorageLib.sammStorage();
        // LiquidityFacet liquidityFacet = LiquidityFacet(ss.itoProxy);

        // LiquidityStorageLib.PoolConfig memory pool = liquidityFacet.getPoolConfig(poolId);
        // LiquidityStorageLib.PoolState memory poolState = liquidityFacet.getPoolState(poolId);
        // // Base fee component
        // uint256 baseFee = (amountOut * BASE_FEE_BPS) / FEE_DENOMINATOR;

        // // Volatility component (1 bps per 10% volatility)
        // uint256 volatilityFactor = (amountOut * (volatility / 1e17)) / 100;

        // // Depth component (0.1 bps per 1% of pool depth)
        // uint256 poolDepth =
        //     (amountIn * PRECISION) / ((pool.tokenA == address(0)) ? poolState.reserveA : poolState.reserveB);
        // uint256 depthFactor = (amountOut * poolDepth) / (1000 * PRECISION);

        return 0;
    }

    function _calculateTimeDelta(bytes8 poolId) private view returns (uint256) {
        SAMMStorageLib.SAMMStorage storage ss = SAMMStorageLib.sammStorage();
        LiquidityFacet liquidityFacet = LiquidityFacet(ss.itoProxy);
        LiquidityStorageLib.PoolState memory pool = liquidityFacet.getPoolState(poolId);
        uint256 timeElapsed = block.timestamp - pool.lastUpdate;
        return (timeElapsed * PRECISION) / SECONDS_PER_YEAR;
    }

    function _calculateExponent(uint256 volatility, uint256 timeDelta, int256 z0) private pure returns (int256) {
        // Calculate convexity adjustment: - (σ² * Δt)/2
        uint256 sigma2 = (volatility * volatility) / PRECISION;
        uint256 timeDelta_sigma2 = (timeDelta * sigma2) / PRECISION;
        int256 convexityAdjustment = -int256(timeDelta_sigma2 / 2);

        // Calculate random shock: σ * √(Δt) * Z₀
        int256 sigma_z0 = (int256(volatility) * z0) / int256(PRECISION);
        int256 sqrt_timeDelta = int256(Math.sqrt(timeDelta * PRECISION));
        int256 randomShock = (sigma_z0 * sqrt_timeDelta) / int256(PRECISION);

        return convexityAdjustment + randomShock;
    }

    function _exp(int256 x) private pure returns (uint256) {
        // Handle negative exponents
        bool isNegative = x < 0;
        uint256 absX = isNegative ? uint256(-x) : uint256(x);

        // Taylor series expansion parameters
        uint256 result = PRECISION;
        uint256 term = PRECISION;

        // Max 10 iterations to balance accuracy and gas
        for (uint256 i = 1; i < 10; i++) {
            term = (term * absX) / PRECISION / i;
            result += term;
            if (term < 1e12) break; // Stop when terms become negligible
        }

        return isNegative ? (PRECISION * PRECISION) / result : result;
    }

    function _calculateEffectivePrice(uint256 marketPrice, uint256 priceFactor, address tokenIn, bytes8 poolId)
        private
        view
        returns (uint256)
    {
        SAMMStorageLib.SAMMStorage storage ss = SAMMStorageLib.sammStorage();
        LiquidityFacet liquidityFacet = LiquidityFacet(ss.itoProxy);
        LiquidityStorageLib.PoolConfig memory pool = liquidityFacet.getPoolConfig(poolId);
        if (tokenIn == pool.tokenA) {
            // TokenA -> TokenB: P_effective = P_market × factor
            return (marketPrice * priceFactor) / PRECISION;
        } else {
            // TokenB -> TokenA: P_effective = PRECISION² / (P_market × factor)
            return (PRECISION * PRECISION) / ((marketPrice * priceFactor) / PRECISION);
        }
    }
}
