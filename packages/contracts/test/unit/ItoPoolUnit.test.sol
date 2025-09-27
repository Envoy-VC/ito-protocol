// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {Test} from "forge-std/Test.sol";
import {SetUp} from "test/common/SetUp.sol";

import {MockToken} from "src/tokens/MockToken.sol";

import {console2 as console} from "forge-std/console2.sol";

import {ItoPool} from "src/ItoPool.sol";

import {Logging} from "test/helpers/Logging.sol";

// Interfaces
import {IPool} from "src/interfaces/IPool.sol";

contract ItoRouterUnitTest is Test, SetUp {
    using Logging for uint256;

    MockToken public mockUSD;
    MockToken public mockBTC;
    ItoPool public pool;

    function setUp() public override {
        super.setUp();

        vm.startBroadcast(accounts.richard.addr);
        mockUSD = new MockToken(accounts.richard.addr);
        mockBTC = new MockToken(accounts.richard.addr);

        bytes32 salt = keccak256(abi.encodePacked("pool"));
        address poolAddress = router.createPool(address(mockBTC), address(mockUSD), 0, salt);

        pool = ItoPool(poolAddress);

        // Mint Reward Tokens for 100k for 365 days
        uint256 rewards = 100_000e18;
        rewardToken.mint(accounts.richard.addr, rewards);
        // Allow
        rewardToken.approve(address(pool), rewards);

        pool.fundRewards(rewards, 356 days);

        vm.stopBroadcast();
    }

    function test_addLiquidity() public {
        // Mint Mock Tokens for User
        address user = accounts.dinesh.addr;
        vm.startBroadcast(user);
        uint256 amountADesired = 1e18;
        uint256 amountBDesired = 120_000e18;

        mockBTC.mint(user, 10e18);
        mockUSD.mint(user, 120_000e18 * 10);

        // Approve Tokens for Pool
        mockBTC.approve(address(pool), 10e18);
        mockUSD.approve(address(pool), 120_000e18 * 10);

        pool.addLiquidity(amountADesired, amountBDesired);

        IPool.UserPosition memory position = pool.getUserPosition(user);
        console.log("LP Tokens: ", position.lpTokens.parseDecimal(18, 4));
        console.log("Reward Debt: ", position.rewardDebt.parseDecimal(18, 4));
        console.log("ITO Balance: ", rewardToken.balanceOf(user).parseDecimal(18, 4));
        console.log("BTC Balance: ", mockBTC.balanceOf(user).parseDecimal(18, 4));
        console.log("USD Balance: ", mockUSD.balanceOf(user).parseDecimal(18, 4));

        console.log("\nAfter Removing Liquidity");

        vm.warp(block.timestamp + 7 days);

        pool.removeLiquidity(position.lpTokens);

        position = pool.getUserPosition(user);
        console.log("LP Tokens: ", position.lpTokens.parseDecimal(18, 4));
        console.log("Reward Debt: ", position.rewardDebt.parseDecimal(18, 4));
        console.log("ITO Balance: ", rewardToken.balanceOf(user).parseDecimal(18, 4));
        console.log("BTC Balance: ", mockBTC.balanceOf(user).parseDecimal(18, 4));
        console.log("USD Balance: ", mockUSD.balanceOf(user).parseDecimal(18, 4));

        vm.stopBroadcast();
    }

    
}
