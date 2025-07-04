// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";

library StochasticMath {
    using Math for uint256;

    // Fixed-point precision (18 decimals)
    uint256 internal constant PRECISION = 1e18;
    uint256 internal constant HALF_PRECISION = 5e17;
    uint256 internal constant PRECISION_SQR = 1e36;
    uint256 internal constant LOG2_E = 1442695040888963407;
    uint256 internal constant EPSILON = 1; // To avoid ln(0)
    uint256 private constant P_LOW = 24250000000000000; // 0.02425 * 1e18
    uint256 private constant P_HIGH = PRECISION - P_LOW;

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

    function coeffA(uint256 i) private pure returns (int256) {
        if (i == 0) return -39696830286653760000;
        if (i == 1) return 220946098424520500000;
        if (i == 2) return -275928510446968700000;
        if (i == 3) return 138357751867269000000;
        if (i == 4) return -30664798066147160000;
        return 2506628277459239000; // i==5
    }

    function coeffB(uint256 i) private pure returns (int256) {
        if (i == 0) return -54476098798224060000;
        if (i == 1) return 161585836858040900000;
        if (i == 2) return -155698979859886600000;
        if (i == 3) return 66801311887719720000;
        return -13280681552885720000;
    }

    function coeffC(uint256 i) private pure returns (int256) {
        if (i == 0) return -7784894002430293;
        if (i == 1) return -322396458041136500;
        if (i == 2) return -2400758277161838000;
        if (i == 3) return -2549732539343734000;
        if (i == 4) return 4374664141464968000;
        return 2938163982698783000;
    }

    function coeffD(uint256 i) private pure returns (int256) {
        if (i == 0) return 7784695709041460;
        if (i == 1) return 322467129070039800;
        if (i == 2) return 2445134137142996000;
        return 3754408661907416000;
    }

    /// @notice Core Acklam inverse CDF
    function probit(int256 u) public pure returns (int256) {
        require(u > 0 && uint256(u) < PRECISION, "u out-of-range");

        bool lower = uint256(u) < P_LOW;
        int256 x;
        if (lower || uint256(u) > P_HIGH) {
            uint256 r = lower ? uint256(u) : (PRECISION - uint256(u));
            int256 lt = ln(int256(r));
            uint256 q = sqrt(uint256(-2 * lt));
            x = evalTail(int256(q));
            if (lower) x = -x;
        } else {
            int256 q = u - int256(PRECISION / 2);
            uint256 r = uint256((q * q) / int256(PRECISION));
            x = evalCentral(q, r);
        }
        return x;
    }

    function evalCentral(int256 q, uint256 r) private pure returns (int256) {
        int256 num = coeffA(5);
        for (uint256 i = 5; i > 0; i--) {
            num = (num * int256(r)) / int256(PRECISION) + coeffA(i - 1);
        }
        num = (num * q) / int256(PRECISION);

        int256 den = coeffB(4);
        for (uint256 i = 4; i > 0; i--) {
            den = (den * int256(r)) / int256(PRECISION) + coeffB(i - 1);
        }
        den += int256(PRECISION);
        return (num * int256(PRECISION)) / den;
    }

    function evalTail(int256 q) private pure returns (int256) {
        int256 num = coeffC(5);
        for (uint256 i = 5; i > 0; i--) {
            num = (num * q) / int256(PRECISION) + coeffC(i - 1);
        }

        int256 den = coeffD(3);
        for (uint256 i = 3; i > 0; i--) {
            den = (den * q) / int256(PRECISION) + coeffD(i - 1);
        }
        den += int256(PRECISION);
        return (q * num * int256(PRECISION)) / (den * int256(PRECISION));
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
        require(x > 0, "x must be greater than zero");
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

    function sqrt(uint256 x) internal pure returns (uint256) {
        return Math.sqrt(x);
    }
}
