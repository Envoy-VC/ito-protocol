// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

// OpenZeppelin Imports
import {Create2} from "@openzeppelin/contracts/utils/Create2.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

// Interfaces
import {IRouter} from "./interfaces/IRouter.sol";

// Pool
import {ItoPool} from "./ItoPool.sol";

contract ItoRouter is Ownable, IRouter {
    // =============================================================
    //                        STATE VARIABLES
    // =============================================================

    /// @notice Mapping of tokenA => tokenB => baseRewardRate => poolAddress
    mapping(address => mapping(address => mapping(uint256 => address))) public pools;

    /// @notice ERC-20 Reward Token for the protocol
    address public rewardToken;

    /// @notice Oracle for the protocol
    address public oracle;

    /// @notice Next pool nonce
    uint80 nextPoolNonce;

    /// @notice Version of the protocol for future upgrades
    uint8 public version;

    // =============================================================
    //                         CONSTRUCTOR
    // =============================================================

    /// @notice Initializes the contract with the deployer as the owner
    /// @param initialOwner The initial owner of the contract
    constructor(address initialOwner, address _rewardToken, address _oracle) Ownable(initialOwner) {
        rewardToken = _rewardToken;
        version = 1;
        oracle = _oracle;
    }

    // =============================================================
    //                    PUBLIC/EXTERNAL FUNCTIONS
    // =============================================================

    /// @inheritdoc IRouter
    function createPool(address tokenA, address tokenB, uint256 baseRewardRate, bytes32 salt)
        external
        onlyOwner
        returns (address poolAddress)
    {
        // 1. Validate Pool Config
        validatePoolConfig(tokenA, tokenB, baseRewardRate);

        bytes memory bytecode =
            abi.encodePacked(type(ItoPool).creationCode, abi.encode(tokenA, tokenB, baseRewardRate, address(this)));
        bytes32 bytecodeHash = keccak256(bytecode);

        // 2. Create Pool (Create2 Deterministic Address)
        poolAddress = Create2.computeAddress(salt, bytecodeHash);

        // Check if Pool contract already exists
        if (isContract(poolAddress)) {
            revert PoolAlreadyExists(poolAddress);
        }

        // Deploy Pool contract
        Create2.deploy(0, salt, bytecode);

        pools[tokenA][tokenB][baseRewardRate] = poolAddress;

        emit PoolCreated(tokenA, tokenB, baseRewardRate, poolAddress);
    }

    /// @inheritdoc IRouter
    function getPool(address tokenA, address tokenB, uint256 baseRewardRate)
        external
        view
        returns (address poolAddress)
    {
        return _getPool(tokenA, tokenB, baseRewardRate);
    }

    // =============================================================
    //                    INTERNAL/PRIVATE FUNCTIONS
    // =============================================================

    function _getPool(address tokenA, address tokenB, uint256 baseRewardRate)
        internal
        view
        returns (address poolAddress)
    {
        return pools[tokenA][tokenB][baseRewardRate];
    }

    function validatePoolConfig(address tokenA, address tokenB, uint256 baseRewardRate) internal view {
        // Ensure that Pool does not already exist
        address poolAddress = _getPool(tokenA, tokenB, baseRewardRate);
        if (poolAddress != address(0)) {
            revert PoolAlreadyExists(poolAddress);
        }

        // Check for Duplicate Tokens
        if (tokenA == tokenB) {
            revert DuplicateToken(tokenA);
        }

        // Check for Zero Addresses
        if (tokenA == address(0) || tokenB == address(0)) {
            revert ZeroAddress();
        }
    }

    function poolExists(address tokenA, address tokenB, uint256 baseRewardRate) public view returns (bool) {
        address poolAddress = _getPool(tokenA, tokenB, baseRewardRate);
        return poolAddress != address(0);
    }

    function isContract(address account) internal view returns (bool) {
        uint256 size;
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }

    // =============================================================
    //                       ADMIN FUNCTIONS
    // =============================================================

    /// @notice Sets the version of the protocol
    /// @param _version The version of the protocol
    function setVersion(uint8 _version) external onlyOwner {
        version = _version;
    }
}
