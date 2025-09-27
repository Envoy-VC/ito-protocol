// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {Test} from "forge-std/Test.sol";
import {SetUp} from "test/common/SetUp.sol";

import {MockToken} from "src/tokens/MockToken.sol";

import {console2 as console} from "forge-std/console2.sol";

contract ItoRouterUnitTest is Test, SetUp {
    MockToken public mockUSD;
    MockToken public mockBTC;

    function setUp() public override {
        super.setUp();

        mockUSD = new MockToken(accounts.richard.addr);
        mockBTC = new MockToken(accounts.richard.addr);
    }

    function test_deployment() public view {
        // Log Reward Token and Router Address
        console.log("Reward Token:", address(rewardToken));
        console.log("Router:", address(router));

        // Check Reward Token
        assertEq(address(rewardToken), router.rewardToken());
    }

    function test_createPool() public {
        vm.startBroadcast(accounts.richard.addr);
        bytes32 salt = keccak256(abi.encodePacked("pool"));
        address poolAddress = router.createPool(address(mockBTC), address(mockUSD), 0, salt);

        console.log("Pool Address:", poolAddress);

        // Check Pool Address
        assertEq(poolAddress, router.getPool(address(mockBTC), address(mockUSD), 0));

        vm.stopBroadcast();
    }
}
