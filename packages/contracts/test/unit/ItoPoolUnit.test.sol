// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {Test} from "forge-std/Test.sol";
import {SetUp} from "test/common/SetUp.sol";

import {MockUSDC} from "src/tokens/MockUSD.sol";
import {MockETH} from "src/tokens/MockETH.sol";

import {console2 as console} from "forge-std/console2.sol";

import {ItoPool} from "src/ItoPool.sol";

import {Logging} from "test/helpers/Logging.sol";

// Interfaces
import {IPool} from "src/interfaces/IPool.sol";

contract ItoRouterUnitTest is Test, SetUp {
    using Logging for uint256;

    MockUSDC public mockUSD;
    MockETH public mockETH;
    ItoPool public pool;

    function setUp() public override {
        super.setUp();

        vm.startBroadcast(accounts.richard.addr);
        mockUSD = new MockUSDC(accounts.richard.addr);
        mockETH = new MockETH(accounts.richard.addr);

        bytes32 salt = keccak256(abi.encodePacked("pool"));
        address poolAddress = router.createPool(address(mockETH), address(mockUSD), 0, salt);

        pool = ItoPool(poolAddress);

        oracle.setPriceAndVolatility(address(mockETH), address(mockUSD), 4037.0979210260916e18, 0.025697945445090745e18);

        // Mint Reward Tokens for 100k for 365 days
        uint256 rewards = 100_000e18;
        rewardToken.mint(accounts.richard.addr, rewards);
        // Allow
        rewardToken.approve(address(pool), rewards);

        pool.fundRewards(rewards, 356 days);

        vm.stopBroadcast();
    }

    function _addLiquidity(address user, uint256 amountADesired, uint256 amountBDesired) internal {
        vm.startBroadcast(user);

        mockETH.mint(user, amountADesired);
        mockUSD.mint(user, amountBDesired);
        mockETH.approve(address(pool), amountADesired);
        mockUSD.approve(address(pool), amountBDesired);

        pool.addLiquidity(amountADesired, amountBDesired);

        vm.stopBroadcast();
    }

    function _updatePriceAndVolatility(uint256 price, uint256 volatility) internal {
        vm.startBroadcast(accounts.richard.addr);
        oracle.setPrice(address(mockETH), address(mockUSD), price);
        oracle.setVolatility(address(mockETH), address(mockUSD), volatility);
        vm.stopBroadcast();
    }

    function test_addLiquidity() public {
        // Mint Mock Tokens for User
        address user = accounts.dinesh.addr;
        vm.startBroadcast(user);
        uint256 amountADesired = 1e18;
        uint256 amountBDesired = 4500e18;

        mockETH.mint(user, 10e18);
        mockUSD.mint(user, 4500e18 * 10);

        // Approve Tokens for Pool
        mockETH.approve(address(pool), 10e18);
        mockUSD.approve(address(pool), 4500e18 * 10);

        pool.addLiquidity(amountADesired, amountBDesired);

        IPool.UserPosition memory position = pool.getUserPosition(user);
        console.log("LP Tokens: ", position.lpTokens.parseDecimal(18, 4));
        console.log("Reward Debt: ", position.rewardDebt.parseDecimal(18, 4));
        console.log("ITO Balance: ", rewardToken.balanceOf(user).parseDecimal(18, 4));
        console.log("BTC Balance: ", mockETH.balanceOf(user).parseDecimal(18, 4));
        console.log("USD Balance: ", mockUSD.balanceOf(user).parseDecimal(18, 4));

        console.log("\nAfter Removing Liquidity");

        vm.warp(block.timestamp + 7 days);

        pool.removeLiquidity(position.lpTokens);

        position = pool.getUserPosition(user);
        console.log("LP Tokens: ", position.lpTokens.parseDecimal(18, 4));
        console.log("Reward Debt: ", position.rewardDebt.parseDecimal(18, 4));
        console.log("ITO Balance: ", rewardToken.balanceOf(user).parseDecimal(18, 4));
        console.log("BTC Balance: ", mockETH.balanceOf(user).parseDecimal(18, 4));
        console.log("USD Balance: ", mockUSD.balanceOf(user).parseDecimal(18, 4));

        vm.stopBroadcast();
    }

    function test_swap() public {
        _addLiquidity(accounts.richard.addr, 100_000e18, 4300e18 * 100_000);
        _updatePriceAndVolatility(4000e18, 0.53e18);

        address user = accounts.dinesh.addr;

        vm.startBroadcast(user);

        // mint and approve tokens for pool
        mockETH.mint(user, 1e18);
        mockETH.approve(address(pool), 1e18);

        // Log Balance before Swap
        console.log("\nBalance Before Swap");
        console.log("BTC Balance: ", mockETH.balanceOf(user).parseDecimal(18, 4));
        console.log("USD Balance: ", mockUSD.balanceOf(user).parseDecimal(18, 4));

        // wrap time
        vm.warp(block.timestamp + 100);

        uint256 requestId = pool.swap(address(mockETH), 1e18);

        uint256[] memory randomWords = new uint256[](1);
        randomWords[0] = uint256(keccak256(abi.encodePacked("ahshha")));

        console.log("Random Word: ", randomWords[0]);

        pool.fulfillSwap(requestId, randomWords);

        console.log("\nBalance After Swap");
        console.log("BTC Balance: ", mockETH.balanceOf(user).parseDecimal(18, 4));
        console.log("USD Balance: ", mockUSD.balanceOf(user).parseDecimal(18, 4));
    }
}
