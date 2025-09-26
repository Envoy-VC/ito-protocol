// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

interface IRouter {
    error PoolAlreadyExists(address pool);
    error DuplicateToken(address token);
    error ZeroAddress();

    struct PoolConfig {
        // Address of ERC20 Token A
        address tokenA;
        // Address of ERC20 Token B
        address tokenB;
        // Reward tokens per second per 1e18 LP tokens
        uint256 baseRewardRate;
    }

    function createPool(PoolConfig calldata config) external returns (address poolAddress);
    function getPool(PoolConfig calldata config) external view returns (address poolAddress);
}