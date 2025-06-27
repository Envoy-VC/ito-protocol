// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import {LiquidityStorageLib} from "../libraries/LiquidityStorage.sol";

import {EmergencyFacet} from "../facets/EmergencyFacet.sol";
import {OwnershipFacet} from "../facets/OwnershipFacet.sol";

import {StochasticMath} from "../libraries/StochasticMath.sol";

contract LiquidityFacet is ReentrancyGuard {
    using SafeERC20 for IERC20;
    using LiquidityStorageLib for LiquidityStorageLib.LiquidityStorage;

    error PoolNotFound(bytes8 poolId);
    error InsufficientAmount(address token);
    error InsufficientLiquidity();
    error InsufficientReserves(address token);

    event PoolCreated(bytes8 indexed poolId, address tokenA, address tokenB);

    event LiquidityAdded(
        address indexed provider,
        bytes8 indexed poolId,
        uint256 amountA,
        uint256 amountB,
        uint256 liquidity
    );

    event LiquidityRemoved(
        address indexed provider,
        bytes8 indexed poolId,
        uint256 amountA,
        uint256 amountB,
        uint256 liquidity
    );

    event RewardsClaimed(
        address indexed user,
        bytes8 indexed poolId,
        uint256 amount
    );

    function createPool(
        address tokenA,
        address tokenB,
        uint256 baseRewardRate
    ) public {
        LiquidityStorageLib.LiquidityStorage storage ls = LiquidityStorageLib
            .liquidityStorage();

        // When Not Paused
        EmergencyFacet(ls.itoProxy).whenNotPaused();
        // Only Owner
        OwnershipFacet(ls.itoProxy).enforceContractOwner();

        // Validate Pool Config and get Pool Id
        bytes8 poolId = LiquidityStorageLib.validatePoolConfig(tokenA, tokenB);

        // Set Pool Config
        ls.poolConfigs[poolId] = LiquidityStorageLib.PoolConfig({
            tokenA: tokenA,
            tokenB: tokenB,
            baseRewardRate: baseRewardRate,
            version: ls.version
        });

        emit PoolCreated(poolId, tokenA, tokenB);
    }

    function addLiquidity(
        bytes8 poolId,
        uint256 amountADesired,
        uint256 amountBDesired
    ) public nonReentrant {
        LiquidityStorageLib.LiquidityStorage storage ls = LiquidityStorageLib
            .liquidityStorage();

        // Valid Pool
        if (!LiquidityStorageLib.poolExists(poolId)) {
            revert PoolNotFound(poolId);
        }

        // When Not Paused
        EmergencyFacet(ls.itoProxy).whenNotPaused();

        LiquidityStorageLib.PoolConfig storage poolConfig = ls.poolConfigs[
            poolId
        ];
        LiquidityStorageLib.PoolState storage poolState = ls.poolStates[poolId];
        LiquidityStorageLib.UserPosition storage userPosition = ls
            .userPositions[msg.sender][poolId];

        // Claim pending rewards
        _claimRewards(poolId, msg.sender);

        // Fetch volatility data from oracle
        uint256 volatility = _getVolatility(poolId);

        // Calculate liquidity Amounts
        (uint256 amountA, uint256 amountB) = StochasticMath.calculateLiquidity(
            poolState.reserveA,
            poolState.reserveB,
            volatility,
            amountADesired,
            amountBDesired
        );

        if (amountA <= 0) {
            revert InsufficientAmount(poolConfig.tokenA);
        }

        if (amountB <= 0) {
            revert InsufficientAmount(poolConfig.tokenB);
        }

        // Transfer tokens to contract
        IERC20(poolConfig.tokenA).safeTransferFrom(
            msg.sender,
            address(this),
            amountA
        );
        IERC20(poolConfig.tokenB).safeTransferFrom(
            msg.sender,
            address(this),
            amountB
        );

        uint256 liquidity = StochasticMath.calculateLPTokens(
            poolState.totalLPTokens,
            poolState.reserveA,
            poolState.reserveB,
            amountA,
            amountB,
            volatility
        );

        // TODO: Think about min threshold
        // require(liquidity >= config.minLiquidity, "Insufficient liquidity");

        // Update state
        poolState.reserveA += amountA;
        poolState.reserveB += amountB;
        poolState.totalLPTokens += liquidity;
        poolState.lastUpdate = block.timestamp;

        // Update user position
        userPosition.lpTokens += liquidity;
        userPosition.rewardDebt =
            (userPosition.lpTokens * poolState.accRewardPerShare) /
            StochasticMath.PRECISION;
        userPosition.lastInteraction = block.timestamp;

        emit LiquidityAdded(msg.sender, poolId, amountA, amountB, liquidity);
    }

    function removeLiquidity(
        bytes8 poolId,
        uint256 liquidity
    ) public nonReentrant {
        LiquidityStorageLib.LiquidityStorage storage ls = LiquidityStorageLib
            .liquidityStorage();

        // Valid Pool
        if (!LiquidityStorageLib.poolExists(poolId)) {
            revert PoolNotFound(poolId);
        }

        // When Not Paused
        EmergencyFacet(ls.itoProxy).whenNotPaused();

        LiquidityStorageLib.PoolConfig storage poolConfig = ls.poolConfigs[
            poolId
        ];
        LiquidityStorageLib.PoolState storage poolState = ls.poolStates[poolId];
        LiquidityStorageLib.UserPosition storage userPosition = ls
            .userPositions[msg.sender][poolId];

        if (liquidity > userPosition.lpTokens) {
            revert InsufficientLiquidity();
        }

        // Claim any pending rewards first
        _claimRewards(poolId, msg.sender);

        // Calculate proportional share
        uint256 share = (liquidity * StochasticMath.PRECISION) /
            poolState.totalLPTokens;
        uint256 amountA = (poolState.reserveA * share) /
            StochasticMath.PRECISION;
        uint256 amountB = (poolState.reserveB * share) /
            StochasticMath.PRECISION;

        if (amountA <= 0) {
            revert InsufficientReserves(poolConfig.tokenA);
        }

        if (amountB <= 0) {
            revert InsufficientReserves(poolConfig.tokenB);
        }

        // Update state
        poolState.reserveA -= amountA;
        poolState.reserveB -= amountB;
        poolState.totalLPTokens -= liquidity;
        poolState.lastUpdate = block.timestamp;

        // Update user position
        userPosition.lpTokens -= liquidity;
        userPosition.rewardDebt =
            (userPosition.lpTokens * poolState.accRewardPerShare) /
            StochasticMath.PRECISION;
        userPosition.lastInteraction = block.timestamp;

        // Transfer tokens to user
        IERC20(poolConfig.tokenA).safeTransfer(msg.sender, amountA);
        IERC20(poolConfig.tokenB).safeTransfer(msg.sender, amountB);

        emit LiquidityRemoved(msg.sender, poolId, amountA, amountB, liquidity);
    }

    function _claimRewards(bytes8 poolId, address user) internal {
        LiquidityStorageLib.LiquidityStorage storage ls = LiquidityStorageLib
            .liquidityStorage();

        LiquidityStorageLib.PoolConfig storage poolConfig = ls.poolConfigs[
            poolId
        ];
        LiquidityStorageLib.PoolState storage poolState = ls.poolStates[poolId];
        LiquidityStorageLib.UserPosition storage userPosition = ls
            .userPositions[msg.sender][poolId];

        // Fetch current volatility from oracle
        uint256 volatility = _getVolatility(poolId);

        // Calculate pending rewards
        uint256 pending = StochasticMath.calculatePendingRewards(
            userPosition.lpTokens,
            poolState.accRewardPerShare,
            userPosition.rewardDebt,
            userPosition.lastInteraction,
            poolConfig.baseRewardRate,
            volatility
        );

        if (pending > 0) {
            // Update reward debt
            userPosition.rewardDebt =
                (userPosition.lpTokens * poolState.accRewardPerShare) /
                StochasticMath.PRECISION;
            userPosition.lastInteraction = block.timestamp;

            // Transfer rewards
            IERC20(ls.rewardToken).safeTransfer(user, pending);
            emit RewardsClaimed(user, poolId, pending);
        }
    }

    function _getVolatility(
        bytes8 poolId
    ) internal view returns (uint256 volatility) {
        // Demo purposes, use oracle Facet Here
        return 8 * 1e16; // 8% volatility
    }
}
