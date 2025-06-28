// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";
import {Trigonometry} from "./Trig.sol";

library StochasticMath {
    using Math for uint256;

    // Fixed-point precision (18 decimals)
    uint256 internal constant PRECISION = 1e18;
    uint256 internal constant HALF_PRECISION = 5e17;
    uint256 internal constant PRECISION_SQR = 1e36;
    uint256 internal constant LOG2_E = 1442695040888963407;
    uint256 internal constant EPSILON = 1; // To avoid ln(0)

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
        uint256 price,
        uint256 amountADesired,
        uint256 amountBDesired
    ) internal pure returns (uint256 amountA, uint256 amountB) {
        if (reserveA == 0 && reserveB == 0) {
            // Initial liquidity - use desired amounts
            return (amountADesired, amountBDesired);
        }

        // Volatility is in percentage (0-100) in 18 decimals
        uint256 sigma = volatility;

        // Calculate current ratio with precision
        uint256 currentRatio = (reserveA * PRECISION) / reserveB;
        uint256 oracleRatio = PRECISION_SQR / price;

        // adjustedRatio = (σ * currentRatio + (1 - σ) * oracleRatio)
        uint256 targetRatio = (sigma * currentRatio + ((PRECISION) - sigma) * oracleRatio) / PRECISION;

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

    /// @notice Finds the zero-based index of the first one in the binary representation of x.
    /// @dev See the note on msb in the "Find First Set" Wikipedia article https://en.wikipedia.org/wiki/Find_first_set
    /// @param x The uint256 number for which to find the index of the most significant bit.
    /// @return msb The index of the most significant bit as an uint256.
    function mostSignificantBit(uint256 x) internal pure returns (uint256 msb) {
        if (x >= 2 ** 128) {
            x >>= 128;
            msb += 128;
        }
        if (x >= 2 ** 64) {
            x >>= 64;
            msb += 64;
        }
        if (x >= 2 ** 32) {
            x >>= 32;
            msb += 32;
        }
        if (x >= 2 ** 16) {
            x >>= 16;
            msb += 16;
        }
        if (x >= 2 ** 8) {
            x >>= 8;
            msb += 8;
        }
        if (x >= 2 ** 4) {
            x >>= 4;
            msb += 4;
        }
        if (x >= 2 ** 2) {
            x >>= 2;
            msb += 2;
        }
        if (x >= 2 ** 1) {
            // No need to shift x any more.
            msb += 1;
        }
    }
    /// @notice Calculates the binary logarithm of x.
    ///
    /// @dev Based on the iterative approximation algorithm.
    /// https://en.wikipedia.org/wiki/Binary_logarithm#Iterative_approximation
    ///
    /// Requirements:
    /// - x must be greater than zero.
    ///
    /// Caveats:
    /// - The results are nor perfectly accurate to the last digit, due to the lossy precision of the iterative approximation.
    ///
    /// @param x The signed 59.18-decimal fixed-point number for which to calculate the binary logarithm.
    /// @return result The binary logarithm as a signed 59.18-decimal fixed-point number.

    function log2(int256 x) internal pure returns (int256 result) {
        require(x > 0);
        unchecked {
            // This works because log2(x) = -log2(1/x).
            int256 sign;
            if (x >= int256(PRECISION)) {
                sign = 1;
            } else {
                sign = -1;
                // Do the fixed-point inversion inline to save gas. The numerator is PRECISION * PRECISION.
                assembly {
                    x := div(1000000000000000000000000000000000000, x)
                }
            }

            // Calculate the integer part of the logarithm and add it to the result and finally calculate y = x * 2^(-n).
            uint256 n = mostSignificantBit(uint256(x / int256(PRECISION)));

            // The integer part of the logarithm as a signed 59.18-decimal fixed-point number. The operation can't overflow
            // because n is maximum 255, PRECISION is 1e18 and sign is either 1 or -1.
            result = int256(n) * int256(PRECISION);

            // This is y = x * 2^(-n).
            int256 y = x >> n;

            // If y = 1, the fractional part is zero.
            if (y == int256(PRECISION)) {
                return result * sign;
            }

            // Calculate the fractional part via the iterative approximation.
            // The "delta >>= 1" part is equivalent to "delta /= 2", but shifting bits is faster.
            for (int256 delta = int256(HALF_PRECISION); delta > 0; delta >>= 1) {
                y = (y * y) / int256(PRECISION);

                // Is y^2 > 2 and so in the range [2,4)?
                if (y >= 2 * int256(PRECISION)) {
                    // Add the 2^(-m) factor to the logarithm.
                    result += delta;

                    // Corresponds to z/2 on Wikipedia.
                    y >>= 1;
                }
            }
            result *= sign;
        }
    }

    function ln(int256 x) internal pure returns (int256 result) {
        // Do the fixed-point multiplication inline to save gas. This is overflow-safe because the maximum value that log2(x)
        // can return is 195205294292027477728.
        unchecked {
            result = (log2(x) * int256(PRECISION)) / int256(LOG2_E);
        }
    }

    function _boxMullerTransform(uint256 r1, uint256 r2) internal pure returns (int256 z0, int256 z1) {
        // Step 1: Convert to uniform [0, 1) by modding and scaling
        uint256 u1 = (r1 % (PRECISION - 1)) + EPSILON; // Ensure u1 ≠ 0
        uint256 u2 = r2 % PRECISION;

        // Step 2: Compute ln(u1)
        int256 lnU1 = ln(int256(u1)); // returns negative number

        // Step 3: Compute sqrt(-2 * ln(u1))
        // -2 * ln(u1) = -2e18 * lnU1 / 1e18 = -2 * lnU1
        uint256 mag = Math.sqrt(uint256(int256(-2) * lnU1)); // magnitude = sqrt(-2 ln(u1))

        // Step 4: Compute angle = 2π * u2
        uint256 theta = (Trigonometry.PI * 2 * u2) / PRECISION;

        // Step 5: z0 = mag * cos(theta), z1 = mag * sin(theta)
        // Result is in normal distribution space
        int256 normZ0 = int256(mag) * int256(Trigonometry.cos(theta)) / int256(PRECISION);
        int256 normZ1 = int256(mag) * int256(Trigonometry.sin(theta)) / int256(PRECISION);
    }
}
