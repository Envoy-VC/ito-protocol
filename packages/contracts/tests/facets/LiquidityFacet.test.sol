// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Test, console2 as console, Vm} from "forge-std/Test.sol";

import {SetUp} from "tests/base/SetUp.sol";

// Libraries
import {ItoProxyLib} from "src/libraries/ItoProxyLib.sol";

// Interfaces
import {IDiamondLoupe} from "src/interfaces/IDiamondLoupe.sol";

contract LiquidityFacetTests is Test, SetUp {
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
}
