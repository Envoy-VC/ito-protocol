// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

interface IOracle {
    function getPrice(address tokenA, address tokenB) external view returns (uint256);
    function getVolatility(address tokenA, address tokenB) external view returns (uint256);
}
