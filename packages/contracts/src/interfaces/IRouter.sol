// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

interface IRouter {
    /// @notice Error thrown when a pool already exists
    error PoolAlreadyExists(address pool);
    /// @notice Error thrown when a token is duplicated
    error DuplicateToken(address token);
    /// @notice Error thrown when an address is zero
    error ZeroAddress();

    /// @notice Event emitted when a pool is created
    /// @param tokenA The first token of the pool
    /// @param tokenB The second token of the pool
    /// @param baseRewardRate The base reward rate for the pool
    /// @param poolAddress The address of the newly created pool
    event PoolCreated(address tokenA, address tokenB, uint256 baseRewardRate, address poolAddress);

    /// @notice Creates a new pool for the given token pair and base reward rate
    /// @param tokenA The first token of the pool
    /// @param tokenB The second token of the pool
    /// @param baseRewardRate The base reward rate for the pool
    /// @param salt The salt for the pool
    /// @return poolAddress The address of the newly created pool
    function createPool(address tokenA, address tokenB, uint256 baseRewardRate, bytes32 salt)
        external
        returns (address poolAddress);

    /// @notice Gets the address of the pool for the given token pair and base reward rate
    /// @param tokenA The first token of the pool
    /// @param tokenB The second token of the pool
    /// @param baseRewardRate The base reward rate for the pool
    /// @return poolAddress The address of the pool
    function getPool(address tokenA, address tokenB, uint256 baseRewardRate) external returns (address poolAddress);
}
