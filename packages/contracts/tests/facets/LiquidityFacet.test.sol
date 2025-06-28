// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Test, console2 as console, Vm} from "forge-std/Test.sol";

import {SetUp} from "tests/base/SetUp.sol";

// Libraries
import {ItoProxyLib} from "src/libraries/ItoProxyLib.sol";

// Interfaces
import {IDiamondLoupe} from "src/interfaces/IDiamondLoupe.sol";

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

import {LiquidityStorageLib} from "src/libraries/LiquidityStorage.sol";

contract LiquidityFacetTests is Test, SetUp {
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

    function test_createPool() public {
        vm.startBroadcast(owner.addr);
        address tokenA = address(mockUSD);
        address tokenB = address(mockETH);
        uint256 baseRewardRate = 100;
        bytes8 poolId = liquidityFacet.createPool(tokenA, tokenB, baseRewardRate);
        assert(poolId != bytes8(0));
        vm.stopBroadcast();
    }

    function test_addLiquidity() public {
        // Create Pool ETH/USD
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

        vm.startBroadcast(alice.addr);
        uint256 aliceETHBalance = mockETH.balanceOf(alice.addr);
        uint256 aliceUSDBalance = mockUSD.balanceOf(alice.addr);
        uint256 aliceItoBalance = itoToken.balanceOf(alice.addr);

        uint256 amountA = 0;
        uint256 amountB = 0;
        uint256 liquidity = 0;

        LiquidityStorageLib.PoolState memory state = liquidityFacet.getPoolState(poolId);

        console.log("\n========= Adding Initial Liquidity =========");
        console.log("Alice ETH: ", parseDecimal(aliceETHBalance, 18, 4));
        console.log("Alice USD: ", parseDecimal(aliceUSDBalance, 18, 2));
        console.log("Alice ITO: ", parseDecimal(aliceItoBalance, 18, 2));

        // Approve
        mockUSD.approve(address(liquidityFacet), 2500 ether);
        mockETH.approve(address(liquidityFacet), 1 ether);

        // Add Liquidity
        (amountA, amountB, liquidity) = liquidityFacet.addLiquidity(poolId, 1 ether, 2500 ether);
        state = liquidityFacet.getPoolState(poolId);
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

        aliceETHBalance = mockETH.balanceOf(alice.addr);
        aliceUSDBalance = mockUSD.balanceOf(alice.addr);
        aliceItoBalance = itoToken.balanceOf(alice.addr);

        console.log("Alice ETH: ", parseDecimal(aliceETHBalance, 18, 4));
        console.log("Alice USD: ", parseDecimal(aliceUSDBalance, 18, 2));
        console.log("Alice ITO: ", parseDecimal(aliceItoBalance, 18, 2));

        vm.warp(block.timestamp + 7 days);
        console.log("\n============== After 7 Days ==============");

        // Add Liquidity one more time
        mockUSD.approve(address(liquidityFacet), 2500 ether);
        mockETH.approve(address(liquidityFacet), 1 ether);
        vm.stopBroadcast();

        vm.startBroadcast(owner.addr);
        mockPriceFeed.setPrice(2450e8);
        console.log("\nETH Drops to $2450");
        vm.stopBroadcast();

        vm.startBroadcast(alice.addr);

        console.log("\n========= Second Liquidity =========");
        (amountA, amountB, liquidity) = liquidityFacet.addLiquidity(poolId, 1 ether, 2500 ether);
        state = liquidityFacet.getPoolState(poolId);
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

        aliceETHBalance = mockETH.balanceOf(alice.addr);
        aliceUSDBalance = mockUSD.balanceOf(alice.addr);
        aliceItoBalance = itoToken.balanceOf(alice.addr);

        console.log("Alice ETH: ", parseDecimal(aliceETHBalance, 18, 4));
        console.log("Alice USD: ", parseDecimal(aliceUSDBalance, 18, 2));
        console.log("Alice ITO: ", parseDecimal(aliceItoBalance, 18, 2));

        vm.stopBroadcast();
    }
}
