// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";

library StochasticMath {
    using Math for uint256;

    // Fixed-point precision (18 decimals)
    uint256 internal constant PRECISION = 1e18;
    uint256 internal constant PRECISION_SQR = 1e36;

    /// @notice Calculates the amount of token A and token B that should be
    /// added to reserveA and reserveB to achieve a desired amount of liquidity
    /// @param reserveA The current reserve of token A
    /// @param reserveB The current reserve of token B
    /// @param volatility The current volatility of the pool
    /// @param amountADesired The desired amount of token A
    /// @param amountBDesired The desired amount of token B
    /// @return amountA The amount of token A to add to reserveA
    /// @return amountB The amount of token B to add to reserveB
    function calculateLiquidity(
        uint256 reserveA,
        uint256 reserveB,
        uint256 volatility,
        uint256 amountADesired,
        uint256 amountBDesired
    ) internal pure returns (uint256 amountA, uint256 amountB) {
        if (reserveA == 0 && reserveB == 0) {
            // Initial liquidity - use desired amounts
            // TODO: Think about this case
            return (amountADesired, amountBDesired);
        }

        // Convert volatility to fixed-point (0-1)
        uint256 sigma = volatility;

        // Calculate current ratio with precision
        uint256 currentRatio = (reserveA * PRECISION) / reserveB;
        uint256 oracleRatio = 2450;

        uint256 targetRatio = (sigma * currentRatio + (PRECISION - sigma) * oracleRatio) / PRECISION;

        // Calculate optimal tokenB for desired tokenA
        uint256 amountBOptimal = (amountADesired * PRECISION) / targetRatio;

        if (amountBOptimal <= amountBDesired) {
            return (amountADesired, amountBOptimal);
        } else {
            uint256 amountAOptimal = (amountBDesired * targetRatio) / PRECISION;
            return (amountAOptimal, amountBDesired);
        }
    }

    function calculateLPTokens(
        uint256 totalLPTokens,
        uint256 reserveA,
        uint256 reserveB,
        uint256 amountA,
        uint256 amountB,
        uint256 volatility
    ) internal pure returns (uint256 liquidity) {
        if (totalLPTokens == 0) {
            // Geometric mean for initial liquidity
            return Math.sqrt(amountA * amountB);
        }

        // Volatility-weighted liquidity calculation
        uint256 sigma = volatility;

        uint256 liquidityA = (amountA * totalLPTokens) / reserveA;
        uint256 liquidityB = (amountB * totalLPTokens) / reserveB;

        // Weighted average based on volatility
        liquidity = (sigma * Math.min(liquidityA, liquidityB) + (PRECISION - sigma) * ((liquidityA + liquidityB) / 2))
            / PRECISION;
    }

    function calculatePendingRewards(
        uint256 userLPTokens,
        uint256 accRewardPerShare,
        uint256 rewardDebt,
        uint256 lastInteraction,
        uint256 baseRewardRate,
        uint256 volatility
    ) internal view returns (uint256 pending) {
        // Calculate base pending rewards from pool accumulation
        uint256 poolPending = ((userLPTokens * accRewardPerShare) / PRECISION) - rewardDebt;

        // Calculate time-based rewards since last interaction
        uint256 timeElapsed = block.timestamp - lastInteraction;
        uint256 timeBasedRewards = (userLPTokens * baseRewardRate * timeElapsed) / PRECISION;

        // Apply volatility multiplier (higher volatility = more rewards)
        uint256 volatilityMultiplier = PRECISION + (volatility / 2); // 50% bonus at 100% volatility
        uint256 adjustedRewards = (timeBasedRewards * volatilityMultiplier) / PRECISION;

        pending = poolPending + adjustedRewards;
    }
}
