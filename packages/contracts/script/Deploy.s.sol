// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {Script} from "forge-std/Script.sol";
import {console2 as console} from "forge-std/console2.sol";

import {ItoRouter} from "src/ItoRouter.sol";
import {ItoToken} from "src/tokens/ItoToken.sol";
import {ItoPool} from "src/ItoPool.sol";

import {MockUSDC} from "src/tokens/MockUSD.sol";
import {console2 as console} from "forge-std/console2.sol";
import {MockETH} from "src/tokens/MockETH.sol";

import {MockOracle} from "src/mocks/MockOracle.sol";

contract Deploy is Script {
    ItoRouter public router;
    ItoToken public rewardToken;
    MockOracle public oracle;
    MockUSDC public mockUSD;
    MockETH public mockETH;
    ItoPool public pool;

    function run() public {
        address owner = 0x9A36a8EDAF9605F7D4dDC72F4D81463fb6f841d8;
        vm.startBroadcast(owner);

        // Deploy Protocol Contracts
        rewardToken = new ItoToken(owner);
        oracle = new MockOracle(owner);

        // Deploy Mock Tokens
        mockUSD = new MockUSDC(owner);
        mockETH = new MockETH(owner);

        uint256 currentEthPrice = 4037.0979210260916e18;
        uint256 currentVolatility = 0.025697945445090745e18;

        // Update Oracle Price
        oracle.setPriceAndVolatility(address(mockETH), address(mockUSD), currentEthPrice, currentVolatility);

        // Deploy Router
        router = new ItoRouter(owner, address(rewardToken), address(oracle));

        bytes32 salt = keccak256(abi.encodePacked("ETHUSD"));
        address poolAddress = router.createPool(address(mockETH), address(mockUSD), 0, salt);
        pool = ItoPool(poolAddress);

        // Add Initial Liquidity
        uint256 amountADesired = 100_000e18;
        uint256 amountBDesired = currentEthPrice * 100_000;
        mockETH.mint(owner, amountADesired);
        mockUSD.mint(owner, amountBDesired);
        mockETH.approve(address(poolAddress), amountADesired);
        mockUSD.approve(address(poolAddress), amountBDesired);

        pool.addLiquidity(amountADesired, amountBDesired);

        // Log
        console.log("ItoToken: ", address(rewardToken));
        console.log("Oracle: ", address(oracle));
        console.log("MockUSD: ", address(mockUSD));
        console.log("MockETH: ", address(mockETH));
        console.log("Router: ", address(router));
        console.log("Pool Address: ", address(poolAddress));

        vm.stopBroadcast();
    }
}
