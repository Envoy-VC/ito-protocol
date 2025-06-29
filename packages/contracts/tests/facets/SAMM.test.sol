// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Test, console2 as console} from "forge-std/Test.sol";

import {SetUp} from "tests/base/SetUp.sol";

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

import {LiquidityStorageLib} from "src/libraries/LiquidityStorage.sol";

contract SAMMFacetTests is Test, SetUp {
    using Strings for uint256;

    function setUp() public virtual override {
        super.setUp();
    }

    function parseDecimal(uint256 number, uint8 numberDecimals, uint8 printDecimals)
        internal
        pure
        returns (string memory)
    {
        uint256 base = 10 ** numberDecimals;
        uint256 integerPart = number / base;

        // Scale the fractional part to printDecimals
        uint256 fracFull = number % base;
        uint256 fracScaled = (fracFull * (10 ** printDecimals)) / base;

        string memory paddedFraction = padFraction(fracScaled, printDecimals);
        string memory formatted = string(abi.encodePacked(vm.toString(integerPart), ".", paddedFraction));
        return formatted;
    }

    function padFraction(uint256 frac, uint8 decimals) internal pure returns (string memory) {
        string memory padded = vm.toString(frac);
        while (bytes(padded).length < decimals) {
            padded = string(abi.encodePacked("0", padded));
        }
        return padded;
    }

    function _createPool() internal returns (bytes8) {
        vm.startBroadcast(owner.addr);
        address tokenA = address(mockETH);
        address tokenB = address(mockUSD);
        bytes8 poolId = liquidityFacet.createPool(tokenA, tokenB, 0);
        // Add Rewards Pool
        // 100_000 ITO Tokens for 1 Year
        uint256 distributionPeriod = 365 days;
        itoToken.approve(address(liquidityFacet), 100_000 ether);
        liquidityFacet.fundRewards(poolId, 100_000 ether, distributionPeriod);
        vm.stopBroadcast();

        return poolId;
    }

    function logBalances(address user, string memory name) internal view {
        uint256 userETHBalance = mockETH.balanceOf(user);
        uint256 userUSDBalance = mockUSD.balanceOf(user);
        uint256 userItoBalance = itoToken.balanceOf(user);

        console.log(name, "ETH:", parseDecimal(userETHBalance, 18, 4));
        console.log(name, "USD:", parseDecimal(userUSDBalance, 18, 2));
        console.log(name, "ITO:", parseDecimal(userItoBalance, 18, 2));
    }

    function logPoolState(bytes8 poolId) internal view {
        LiquidityStorageLib.PoolState memory state = liquidityFacet.getPoolState(poolId);
        console.log(
            string(
                abi.encodePacked(
                    "Current Pool State: ",
                    parseDecimal(state.reserveA, 18, 4),
                    " ETH and ",
                    parseDecimal(state.reserveB, 18, 2),
                    " USD. Total LP Tokens: ",
                    parseDecimal(state.totalLPTokens, 18, 2)
                )
            )
        );
    }

    function logLiquidityOutcome(uint256 amountA, uint256 amountB, uint256 liquidity) internal pure {
        console.log(
            string(
                abi.encodePacked(
                    "Liquidity Added with: ",
                    parseDecimal(amountA, 18, 4),
                    " ETH and ",
                    parseDecimal(amountB, 18, 2),
                    " USD. Got ",
                    parseDecimal(liquidity, 18, 2),
                    " LP Tokens"
                )
            )
        );
    }

    function test_swap() public {
        // Create Pool ETH/USD
        bytes8 poolId = _createPool();

        // Alice Adds Liquidity
        vm.startBroadcast(alice.addr);
        mockUSD.approve(address(liquidityFacet), 10000 ether);
        mockETH.approve(address(liquidityFacet), 4 ether);
        liquidityFacet.addLiquidity(poolId, 4 ether, 10000 ether);
        vm.stopBroadcast();

        // Testing Swap
        vm.startBroadcast(bob.addr);
        logBalances(bob.addr, "Bob");

        console.log("\n========= Bob Swap =========");

        // Swap
        mockETH.approve(address(sammFacet), 1 ether);
        uint256 requestId = sammFacet.swap(poolId, address(mockETH), 1 ether);

        logPoolState(poolId);
        // Fulfill Swap
        vrfCoordinator.fulfillRandomWords(requestId, address(itoProxy));

        // Log Pool Details After Swap
        logPoolState(poolId);

        // Bob Balance After Swap
        logBalances(bob.addr, "Bob");

        vm.stopBroadcast();
    }
}
