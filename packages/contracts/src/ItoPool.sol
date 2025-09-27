// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

// OpenZeppelin Imports
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

// Libraries
import {StochasticMath} from "./libraries/StochasticMath.sol";

// Interfaces
import {IPool} from "./interfaces/IPool.sol";

contract ItoPool is IPool, ReentrancyGuard {
    using SafeERC20 for IERC20;

    // =============================================================
    //                           CONSTANTS
    // =============================================================

    /// @notice The address of the tokenA for the pool
    address public immutable tokenA;

    /// @notice The address of the tokenB for the pool
    address public immutable tokenB;

    /// @notice The base reward rate for the pool
    uint256 public immutable baseRewardRate;

    // =============================================================
    //                           State Variables
    // =============================================================
    address public rewardToken;

    /// @notice The current state of the pool
    PoolState public poolState;

    /// @notice Mapping that stores the user's position
    mapping(address => UserPosition) public userPositions;

    /// @notice Mapping that stores the swap requests
    mapping(uint256 => SwapRequest) public swapRequests;

    // =============================================================
    //                           Constructor
    // =============================================================
    constructor(address _tokenA, address _tokenB, uint256 _baseRewardRate) {
        tokenA = _tokenA;
        tokenB = _tokenB;
        baseRewardRate = _baseRewardRate;

        poolState =
            PoolState({reserveA: 0, reserveB: 0, totalLPTokens: 0, lastUpdate: block.timestamp, accRewardPerShare: 0});
    }

    // =============================================================
    //                    PUBLIC/EXTERNAL FUNCTIONS
    // =============================================================

    /// @inheritdoc IPool
    function addLiquidity(uint256 amountADesired, uint256 amountBDesired)
        external
        nonReentrant
        returns (uint256 amountA, uint256 amountB, uint256 liquidity)
    {
        // Claim pending rewards
        _claimRewards(msg.sender);

        // Fetch volatility data from oracle
        uint256 volatility = _getVolatility();
        // Fetch price data from oracle
        uint256 price = _getPrice();

        // Calculate liquidity Amounts
        (amountA, amountB) = StochasticMath.calculateLiquidity(
            poolState.reserveA, poolState.reserveB, volatility, price, amountADesired, amountBDesired
        );

        if (amountA <= 0) {
            revert InsufficientAmount(tokenA);
        }

        if (amountB <= 0) {
            revert InsufficientAmount(tokenB);
        }

        // Transfer tokens to contract
        IERC20(tokenA).safeTransferFrom(msg.sender, address(this), amountA);
        IERC20(tokenB).safeTransferFrom(msg.sender, address(this), amountB);

        liquidity = StochasticMath.calculateLPTokens(
            poolState.totalLPTokens, poolState.reserveA, poolState.reserveB, amountA, amountB, volatility
        );

        // Update state
        poolState.reserveA += amountA;
        poolState.reserveB += amountB;
        poolState.totalLPTokens += liquidity;
        poolState.lastUpdate = block.timestamp;

        UserPosition storage userPosition = userPositions[msg.sender];

        // Update user position
        userPosition.lpTokens += liquidity;
        userPosition.rewardDebt = (userPosition.lpTokens * poolState.accRewardPerShare) / StochasticMath.PRECISION;
        userPosition.lastInteraction = block.timestamp;

        emit LiquidityAdded(msg.sender, amountA, amountB, liquidity);
    }

    /// @inheritdoc IPool
    function removeLiquidity(uint256 liquidity) external nonReentrant {
        UserPosition storage userPosition = userPositions[msg.sender];

        // Check if user has enough liquidity
        if (liquidity > userPosition.lpTokens) {
            revert InsufficientLiquidity();
        }

        // Claim any pending rewards first
        _claimRewards(msg.sender);

        // Calculate proportional share
        uint256 share = (liquidity * StochasticMath.PRECISION) / poolState.totalLPTokens;
        uint256 amountA = (poolState.reserveA * share) / StochasticMath.PRECISION;
        uint256 amountB = (poolState.reserveB * share) / StochasticMath.PRECISION;

        if (amountA <= 0) {
            revert InsufficientReserves(tokenA);
        }

        if (amountB <= 0) {
            revert InsufficientReserves(tokenB);
        }

        // Update state
        poolState.reserveA -= amountA;
        poolState.reserveB -= amountB;
        poolState.totalLPTokens -= liquidity;
        poolState.lastUpdate = block.timestamp;

        // Update user position
        userPosition.lpTokens -= liquidity;
        userPosition.rewardDebt = (userPosition.lpTokens * poolState.accRewardPerShare) / StochasticMath.PRECISION;
        userPosition.lastInteraction = block.timestamp;

        // Transfer tokens to user
        IERC20(tokenA).safeTransfer(msg.sender, amountA);
        IERC20(tokenB).safeTransfer(msg.sender, amountB);

        emit LiquidityRemoved(msg.sender, amountA, amountB, liquidity);
    }

    /// @inheritdoc IPool
    function claimRewards(address user) external nonReentrant {
        _claimRewards(user);
    }

    /// @inheritdoc IPool
    function swap(address tokenIn, uint256 amountIn) external nonReentrant returns (uint256) {
        address user = msg.sender;

        if (amountIn <= 0) {
            revert InvalidAmount();
        }

        // Transfer tokens from user
        IERC20(tokenIn).safeTransferFrom(user, address(this), amountIn);

        // TODO: Request Randomness from VRF.
        uint256 requestId = 0;

        // Store swap request
        swapRequests[requestId] = SwapRequest({
            user: user,
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

    function fulfillSwap(uint256 requestId) external nonReentrant {
        // Validate request
        SwapRequest storage request = swapRequests[requestId];

        if (request.isFulfilled) {
            revert RequestAlreadyFulfilled();
        }

        // Get market data
        uint256 price = _getPrice();
        uint256 volatility = _getVolatility();

        // Calculate time delta in years
        uint256 timeDelta = StochasticMath.calculateTimeDelta(poolState.lastUpdate);

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

    /// @inheritdoc IPool
    function getPoolState() external view returns (PoolState memory) {
        return poolState;
    }

    /// @inheritdoc IPool
    function getUserPosition(address user) external view returns (UserPosition memory) {
        return userPositions[user];
    }

    // =============================================================
    //                    INTERNAL/PRIVATE FUNCTIONS
    // =============================================================
    function _claimRewards(address user) internal {
        // Fetch current volatility from oracle
        uint256 volatility = _getVolatility();
        uint256 pending = _calculatePendingRewards(msg.sender, volatility);

        if (pending > 0) {
            _updateUserRewardState(msg.sender);
            uint256 volatilityBonus = (pending * volatility) / (2 * StochasticMath.PRECISION);
            uint256 totalReward = pending + volatilityBonus;

            IERC20(rewardToken).safeTransfer(user, totalReward);

            emit RewardsClaimed(user, totalReward);
        }
    }

    function _updateUserRewardState(address user) internal {
        UserPosition storage position = userPositions[user];

        // Update global rewards
        _updatePoolRewards();

        // Update user's reward debt
        position.rewardDebt = (position.lpTokens * poolState.accRewardPerShare) / StochasticMath.PRECISION;
        position.lastInteraction = block.timestamp;
    }

    function _updatePoolRewards() internal {
        if (block.timestamp <= poolState.lastUpdate) return;

        if (poolState.totalLPTokens > 0) {
            uint256 timeElapsed = block.timestamp - poolState.lastUpdate;
            uint256 rewards = timeElapsed * baseRewardRate;

            uint256 volatility = _getVolatility();
            uint256 adjustedRewards = (rewards * (StochasticMath.PRECISION + volatility / 2)) / StochasticMath.PRECISION;
            poolState.accRewardPerShare += (adjustedRewards * StochasticMath.PRECISION) / poolState.totalLPTokens;
        }

        poolState.lastUpdate = block.timestamp;
    }

    function pendingRewards(address user) external view returns (uint256) {
        uint256 volatility = _getVolatility();
        return _calculatePendingRewards(user, volatility);
    }

    function _calculatePendingRewards(address user, uint256 volatility) internal view returns (uint256) {
        uint256 accRewardPerShare = poolState.accRewardPerShare;
        uint256 totalLPTokens = poolState.totalLPTokens;

        if (block.timestamp > poolState.lastUpdate && totalLPTokens > 0) {
            uint256 timeElapsed = block.timestamp - poolState.lastUpdate;
            uint256 rewards = timeElapsed * baseRewardRate;

            // Apply volatility multiplier
            uint256 adjustedRewards = (rewards * (StochasticMath.PRECISION + volatility / 2)) / StochasticMath.PRECISION;
            accRewardPerShare += (adjustedRewards * StochasticMath.PRECISION) / totalLPTokens;
        }

        UserPosition storage position = userPositions[user];

        return (position.lpTokens * accRewardPerShare) / StochasticMath.PRECISION - position.rewardDebt;
    }

    function _getVolatility() internal pure returns (uint256) {
        return 0;
    }

    function _getPrice() internal pure returns (uint256) {
        return 0;
    }
}
