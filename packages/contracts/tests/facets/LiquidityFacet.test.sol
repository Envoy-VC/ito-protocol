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

    function test_createPool() public {
        vm.startBroadcast(owner.addr);
        address tokenA = address(mockUSD);
        address tokenB = address(mockETH);
        uint256 baseRewardRate = 100;
        bytes8 poolId = liquidityFacet.createPool(tokenA, tokenB, baseRewardRate);
        console.logBytes8(poolId);
        vm.stopBroadcast();
    }

    function test_addLiquidity() public {
        // Create Pool ETH/USD
        vm.startBroadcast(owner.addr);
        address tokenA = address(mockETH);
        address tokenB = address(mockUSD);
        uint256 baseRewardRate = 100;
        bytes8 poolId = liquidityFacet.createPool(tokenA, tokenB, baseRewardRate);
        console.logBytes8(poolId);
        vm.stopBroadcast();

        vm.startBroadcast(alice.addr);
        uint256 aliceETHBalance = mockETH.balanceOf(alice.addr);
        uint256 aliceUSDBalance = mockUSD.balanceOf(alice.addr);

        uint256 amountA = 0;
        uint256 amountB = 0;
        uint256 liquidity = 0;

        LiquidityStorageLib.PoolState memory state = liquidityFacet.getPoolState(poolId);

        console.log("\n========= Initial Liquidity =========");
        console.log("Alice ETH: ", aliceETHBalance / 1e18);
        console.log("Alice USD: ", aliceUSDBalance / 1e18);

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
                    (amountA / 1e18).toString(),
                    " ETH and ",
                    (amountB / 1e18).toString(),
                    " USD. Got ",
                    (liquidity / 1e18).toString(),
                    " LP Tokens"
                )
            )
        );
        console.log(
            string(
                abi.encodePacked(
                    "Current Pool Reserver: ",
                    (state.reserveA / 1e18).toString(),
                    " ETH and ",
                    (state.reserveB / 1e18).toString(),
                    " USD. Total LP Tokens: ",
                    (state.totalLPTokens / 1e18).toString()
                )
            )
        );

        aliceETHBalance = mockETH.balanceOf(alice.addr);
        aliceUSDBalance = mockUSD.balanceOf(alice.addr);

        console.log("Alice ETH: ", aliceETHBalance / 1e18);
        console.log("Alice USD: ", aliceUSDBalance / 1e18);

        // Add Liquidity one more time
        mockUSD.approve(address(liquidityFacet), 5000 ether);
        mockETH.approve(address(liquidityFacet), 2 ether);

        console.log("\n========= Second Liquidity =========");
        (amountA, amountB, liquidity) = liquidityFacet.addLiquidity(poolId, 2 ether, 5000 ether);
        state = liquidityFacet.getPoolState(poolId);
        console.log(
            string(
                abi.encodePacked(
                    "Liquidity Added with: ",
                    (amountA / 1e18).toString(),
                    " ETH and ",
                    (amountB / 1e18).toString(),
                    " USD. Got ",
                    (liquidity / 1e18).toString(),
                    " LP Tokens"
                )
            )
        );
        console.log(
            string(
                abi.encodePacked(
                    "Current Pool Reserver: ",
                    (state.reserveA / 1e18).toString(),
                    " ETH and ",
                    (state.reserveB / 1e18).toString(),
                    " USD. Total LP Tokens: ",
                    (state.totalLPTokens / 1e18).toString()
                )
            )
        );

        aliceETHBalance = mockETH.balanceOf(alice.addr);
        aliceUSDBalance = mockUSD.balanceOf(alice.addr);

        console.log("Alice ETH: ", aliceETHBalance / 1e18);
        console.log("Alice USD: ", aliceUSDBalance / 1e18);

        vm.stopBroadcast();
    }
}
