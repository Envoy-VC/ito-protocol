// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;


import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

// Interfaces
import {IRouter} from "./interfaces/IRouter.sol";

contract ItoRouter  is Ownable, IRouter {
    mapping(bytes8 => PoolConfig) public poolConfigs;

    // (tokenA,tokenB,baseRewardRate) => poolAddress
    mapping(address => mapping(address => mapping(uint256 => address))) public pools;

    address public rewardToken;
    uint80 nextPoolNonce;
    uint8 public version;


    constructor(address initialOwner) Ownable(initialOwner) {}

    function createPool(PoolConfig calldata config) external onlyOwner returns (address poolAddress) {
        // 1. Validate Pool Config
        validatePoolConfig(config);

        // 2. Create Pool (Create2 Deterministic Address)
    }

    function getPool(PoolConfig calldata config) external view returns (address poolAddress) {
        return _getPool(config);
    }

    function _getPool(PoolConfig calldata config) internal view returns (address poolAddress) {
        return  pools[config.tokenA][config.tokenB][config.baseRewardRate];
    }

    function validatePoolConfig(PoolConfig calldata config) internal view {
        // Ensure that Pool does not already exist
        address poolAddress = _getPool(config);
        if (poolAddress != address(0)) {
            revert PoolAlreadyExists(poolAddress);
        }

        // Check for Duplicate Tokens
        if (config.tokenA == config.tokenB) {
            revert DuplicateToken(config.tokenA);
        }

        // Check for Zero Addresses
        if (config.tokenA == address(0) || config.tokenB == address(0)) {
            revert ZeroAddress();
        }
    }

    function poolExists(PoolConfig calldata config) public view returns (bool) {
        address poolAddress = _getPool(config);
        return poolAddress != address(0);
    }

    // Admin functions
    function setRewardToken(address _rewardToken) external onlyOwner {
        rewardToken = _rewardToken;
    }

    function setVersion(uint8 _version) external onlyOwner {
        version = _version;
    }
}