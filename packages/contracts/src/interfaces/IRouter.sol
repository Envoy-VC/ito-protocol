// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

interface IRouter {
    error PoolAlreadyExists(address pool);
    error DuplicateToken(address token);
    error ZeroAddress();

    function createPool(address tokenA, address tokenB, uint256 baseRewardRate, bytes32 salt)
        external
        returns (address poolAddress);

    function getPool(address tokenA, address tokenB, uint256 baseRewardRate) external returns (address poolAddress);
}
