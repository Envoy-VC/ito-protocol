// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {console2 as console} from "forge-std/console2.sol";

import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import {LiquidityStorageLib} from "../libraries/LiquidityStorage.sol";

import {EmergencyFacet} from "../facets/EmergencyFacet.sol";
import {OwnershipFacet} from "../facets/OwnershipFacet.sol";
import {OracleFacet} from "../facets/OracleFacet.sol";

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
        address indexed provider, bytes8 indexed poolId, uint256 amountA, uint256 amountB, uint256 liquidity
    );

    event LiquidityRemoved(
        address indexed provider, bytes8 indexed poolId, uint256 amountA, uint256 amountB, uint256 liquidity
    );

    event RewardsClaimed(address indexed user, bytes8 indexed poolId, uint256 amount);

    function createPool(address tokenA, address tokenB, uint256 baseRewardRate) public returns (bytes8) {
        LiquidityStorageLib.LiquidityStorage storage ls = LiquidityStorageLib.liquidityStorage();

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

        // Initialize pool state
        ls.poolStates[poolId] = LiquidityStorageLib.PoolState({
            reserveA: 0,
            reserveB: 0,
            totalLPTokens: 0,
            lastUpdate: block.timestamp,
            accRewardPerShare: 0
        });

        emit PoolCreated(poolId, tokenA, tokenB);

        return poolId;
    }

    function fundRewards(bytes8 poolId, uint256 amount, uint256 distributionPeriod) public {
        LiquidityStorageLib.LiquidityStorage storage ls = LiquidityStorageLib.liquidityStorage();
        LiquidityStorageLib.PoolConfig storage poolConfig = ls.poolConfigs[poolId];

        // Valid Pool
        if (!LiquidityStorageLib.poolExists(poolId)) {
            revert PoolNotFound(poolId);
        }

        // When Not Paused
        EmergencyFacet(ls.itoProxy).whenNotPaused();
        // Only Owner
        OwnershipFacet(ls.itoProxy).enforceContractOwner();

        // Transfer reward tokens from sender
        IERC20(ls.rewardToken).safeTransferFrom(msg.sender, address(this), amount);

        poolConfig.baseRewardRate += amount / distributionPeriod;
    }

    function addLiquidity(bytes8 poolId, uint256 amountADesired, uint256 amountBDesired)
        public
        nonReentrant
        returns (uint256 amountA, uint256 amountB, uint256 liquidity)
    {
        LiquidityStorageLib.LiquidityStorage storage ls = LiquidityStorageLib.liquidityStorage();

        // Valid Pool
        if (!LiquidityStorageLib.poolExists(poolId)) {
            revert PoolNotFound(poolId);
        }

        // When Not Paused
        EmergencyFacet(ls.itoProxy).whenNotPaused();

        LiquidityStorageLib.PoolConfig storage poolConfig = ls.poolConfigs[poolId];
        LiquidityStorageLib.PoolState storage poolState = ls.poolStates[poolId];
        LiquidityStorageLib.UserPosition storage userPosition = ls.userPositions[msg.sender][poolId];

        // Claim pending rewards
        _claimRewards(poolId, msg.sender);

        // Fetch volatility data from oracle
        uint256 volatility = _getVolatility(poolId);
        // Fetch price data from oracle
        uint256 price = _getPrice(poolId);

        // Calculate liquidity Amounts
        (amountA, amountB) = StochasticMath.calculateLiquidity(
            poolState.reserveA, poolState.reserveB, volatility, price, amountADesired, amountBDesired
        );

        if (amountA <= 0) {
            revert InsufficientAmount(poolConfig.tokenA);
        }

        if (amountB <= 0) {
            revert InsufficientAmount(poolConfig.tokenB);
        }

        // Transfer tokens to contract
        IERC20(poolConfig.tokenA).safeTransferFrom(msg.sender, address(this), amountA);
        IERC20(poolConfig.tokenB).safeTransferFrom(msg.sender, address(this), amountB);

        liquidity = StochasticMath.calculateLPTokens(
            poolState.totalLPTokens, poolState.reserveA, poolState.reserveB, amountA, amountB, volatility
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
        userPosition.rewardDebt = (userPosition.lpTokens * poolState.accRewardPerShare) / StochasticMath.PRECISION;
        userPosition.lastInteraction = block.timestamp;

        emit LiquidityAdded(msg.sender, poolId, amountA, amountB, liquidity);
    }

    function removeLiquidity(bytes8 poolId, uint256 liquidity) public nonReentrant {
        LiquidityStorageLib.LiquidityStorage storage ls = LiquidityStorageLib.liquidityStorage();

        // Valid Pool
        if (!LiquidityStorageLib.poolExists(poolId)) {
            revert PoolNotFound(poolId);
        }

        // When Not Paused
        EmergencyFacet(ls.itoProxy).whenNotPaused();

        LiquidityStorageLib.PoolConfig storage poolConfig = ls.poolConfigs[poolId];
        LiquidityStorageLib.PoolState storage poolState = ls.poolStates[poolId];
        LiquidityStorageLib.UserPosition storage userPosition = ls.userPositions[msg.sender][poolId];

        if (liquidity > userPosition.lpTokens) {
            revert InsufficientLiquidity();
        }

        // Claim any pending rewards first
        _claimRewards(poolId, msg.sender);

        // Calculate proportional share
        uint256 share = (liquidity * StochasticMath.PRECISION) / poolState.totalLPTokens;
        uint256 amountA = (poolState.reserveA * share) / StochasticMath.PRECISION;
        uint256 amountB = (poolState.reserveB * share) / StochasticMath.PRECISION;

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
        userPosition.rewardDebt = (userPosition.lpTokens * poolState.accRewardPerShare) / StochasticMath.PRECISION;
        userPosition.lastInteraction = block.timestamp;

        // Transfer tokens to user
        IERC20(poolConfig.tokenA).safeTransfer(msg.sender, amountA);
        IERC20(poolConfig.tokenB).safeTransfer(msg.sender, amountB);

        emit LiquidityRemoved(msg.sender, poolId, amountA, amountB, liquidity);
    }

    function _claimRewards(bytes8 poolId, address user) public {
        LiquidityStorageLib.LiquidityStorage storage ls = LiquidityStorageLib.liquidityStorage();

        // Fetch current volatility from oracle
        uint256 volatility = _getVolatility(poolId);
        uint256 pending = _calculatePendingRewards(poolId, msg.sender, volatility);

        if (pending > 0) {
            _updateUserRewardState(poolId, msg.sender);
            uint256 volatilityBonus = (pending * volatility) / (2 * StochasticMath.PRECISION);
            uint256 totalReward = pending + volatilityBonus;

            IERC20(ls.rewardToken).safeTransfer(user, totalReward);

            emit RewardsClaimed(user, poolId, totalReward);
        }
    }

    function _updateUserRewardState(bytes8 poolId, address user) internal {
        LiquidityStorageLib.LiquidityStorage storage ls = LiquidityStorageLib.liquidityStorage();
        LiquidityStorageLib.PoolState storage state = ls.poolStates[poolId];
        LiquidityStorageLib.UserPosition storage position = ls.userPositions[user][poolId];

        // Update global rewards
        _updatePoolRewards(poolId);

        // Update user's reward debt
        position.rewardDebt = (position.lpTokens * state.accRewardPerShare) / StochasticMath.PRECISION;
        position.lastInteraction = block.timestamp;
    }

    function _updatePoolRewards(bytes8 poolId) internal {
        LiquidityStorageLib.LiquidityStorage storage ls = LiquidityStorageLib.liquidityStorage();
        LiquidityStorageLib.PoolConfig storage config = ls.poolConfigs[poolId];
        LiquidityStorageLib.PoolState storage state = ls.poolStates[poolId];

        if (block.timestamp <= state.lastUpdate) return;

        if (state.totalLPTokens > 0) {
            uint256 timeElapsed = block.timestamp - state.lastUpdate;
            uint256 rewards = timeElapsed * config.baseRewardRate;

            uint256 volatility = _getVolatility(poolId);
            uint256 adjustedRewards = (rewards * (StochasticMath.PRECISION + volatility / 2)) / StochasticMath.PRECISION;
            state.accRewardPerShare += (adjustedRewards * StochasticMath.PRECISION) / state.totalLPTokens;
        }

        state.lastUpdate = block.timestamp;
    }

    function pendingRewards(bytes8 poolId, address user) external view returns (uint256) {
        uint256 volatility = _getVolatility(poolId);
        return _calculatePendingRewards(poolId, user, volatility);
    }

    function _calculatePendingRewards(bytes8 poolId, address user, uint256 volatility)
        internal
        view
        returns (uint256)
    {
        LiquidityStorageLib.LiquidityStorage storage ls = LiquidityStorageLib.liquidityStorage();
        LiquidityStorageLib.PoolConfig storage config = ls.poolConfigs[poolId];
        LiquidityStorageLib.PoolState storage state = ls.poolStates[poolId];
        LiquidityStorageLib.UserPosition storage position = ls.userPositions[user][poolId];

        uint256 accRewardPerShare = state.accRewardPerShare;
        uint256 totalLPTokens = state.totalLPTokens;

        if (block.timestamp > state.lastUpdate && totalLPTokens > 0) {
            uint256 timeElapsed = block.timestamp - state.lastUpdate;
            uint256 rewards = timeElapsed * config.baseRewardRate;

            // Apply volatility multiplier
            uint256 adjustedRewards = (rewards * (StochasticMath.PRECISION + volatility / 2)) / StochasticMath.PRECISION;
            accRewardPerShare += (adjustedRewards * StochasticMath.PRECISION) / totalLPTokens;
        }

        return (position.lpTokens * accRewardPerShare) / StochasticMath.PRECISION - position.rewardDebt;
    }

    function _getVolatility(bytes8 poolId) internal view returns (uint256) {
        LiquidityStorageLib.LiquidityStorage storage ls = LiquidityStorageLib.liquidityStorage();
        return OracleFacet(ls.itoProxy).getLatestVolatility(poolId);
    }

    function _getPrice(bytes8 poolId) internal view returns (uint256) {
        LiquidityStorageLib.LiquidityStorage storage ls = LiquidityStorageLib.liquidityStorage();
        return OracleFacet(ls.itoProxy).getLatestPrice(poolId);
    }

    // View Functions
    function getPoolState(bytes8 poolId) public view returns (LiquidityStorageLib.PoolState memory poolState) {
        LiquidityStorageLib.LiquidityStorage storage ls = LiquidityStorageLib.liquidityStorage();
        poolState = ls.poolStates[poolId];
    }

    function getPoolConfig(bytes8 poolId) public view returns (LiquidityStorageLib.PoolConfig memory poolConfig) {
        LiquidityStorageLib.LiquidityStorage storage ls = LiquidityStorageLib.liquidityStorage();
        poolConfig = ls.poolConfigs[poolId];
    }

    function getUserPosition(address user, bytes8 poolId)
        public
        view
        returns (LiquidityStorageLib.UserPosition memory)
    {
        LiquidityStorageLib.LiquidityStorage storage ls = LiquidityStorageLib.liquidityStorage();
        return ls.userPositions[user][poolId];
    }

    function poolExists(bytes8 poolId) public view {
        LiquidityStorageLib.poolExists(poolId);
    }

    function _updatePoolAndTransferAfterSwap(
        bytes8 poolId,
        address tokenIn,
        uint256 amountIn,
        address tokenOut,
        uint256 amountOut,
        address user
    ) public {
        LiquidityStorageLib.LiquidityStorage storage ls = LiquidityStorageLib.liquidityStorage();
        LiquidityStorageLib.PoolConfig storage poolConfig = ls.poolConfigs[poolId];
        LiquidityStorageLib.PoolState storage poolState = ls.poolStates[poolId];

        require(msg.sender == ls.itoProxy, "Only SAMM can call this function through Proxy");

        if (tokenIn == poolConfig.tokenA) {
            poolState.reserveA += amountIn;
            poolState.reserveB -= amountOut;
        } else {
            poolState.reserveA -= amountOut;
            poolState.reserveB += amountIn;
        }

        poolState.lastUpdate = block.timestamp;
        IERC20(tokenOut).transfer(user, amountOut);
    }
}
