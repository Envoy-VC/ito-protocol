// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {Test} from "forge-std/Test.sol";
import {SetUp} from "test/common/SetUp.sol";

import {console2 as console} from "forge-std/console2.sol";

contract ItoRouterUnitTest is Test, SetUp {
    function setUp() public override {
        super.setUp();
    }

    function test_deployment() public view {
        // Log Reward Token and Router Address
        console.log("Reward Token:", address(rewardToken));
        console.log("Router:", address(router));

        // Check Reward Token
        assertEq(address(rewardToken), router.rewardToken());
    }
}
