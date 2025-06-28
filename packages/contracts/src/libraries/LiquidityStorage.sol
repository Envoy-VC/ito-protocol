// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

library LiquidityStorageLib {
    bytes32 constant LIQUIDITY_STORAGE_POSITION = keccak256("ito.protocol.liquidity.storage");

    error PoolAlreadyExists(bytes8 poolId);
    error DuplicateToken(address token);
    error ZeroAddress();

    struct PoolConfig {
        // Address of ERC20 Token A
        address tokenA;
        // Address of ERC20 Token B
        address tokenB;
        // Reward tokens per second per 1e18 LP tokens
        uint256 baseRewardRate;
        // Version for tracking upgrades
        uint8 version;
    }

    struct PoolState {
        uint256 reserveA;
        uint256 reserveB;
        uint256 totalLPTokens;
        uint256 lastUpdate;
        uint256 accRewardPerShare; // Accumulated rewards per LP token (1e18 precision)
    }

    struct UserPosition {
        uint256 lpTokens;
        uint256 rewardDebt; // Reward debt for accounting
        uint256 lastInteraction; // Timestamp of last interaction
    }

    struct LiquidityStorage {
        // Pool ID => Configuration
        mapping(bytes8 => PoolConfig) poolConfigs;
        // Pool ID => State
        mapping(bytes8 => PoolState) poolStates;
        // User => Pool ID => Position
        mapping(address => mapping(bytes8 => UserPosition)) userPositions;
        // Reward token address
        address rewardToken;
        // Pool nonce
        uint80 nextPoolNonce;
        // Version for tracking upgrades
        uint8 version;
        // ITO Proxy address
        address itoProxy;
    }

    function liquidityStorage() internal pure returns (LiquidityStorage storage os) {
        bytes32 position = LIQUIDITY_STORAGE_POSITION;
        assembly {
            os.slot := position
        }
    }

    function initLiquidityStorage(address _rewardToken, address _itoProxy) internal {
        LiquidityStorage storage ls = liquidityStorage();
        ls.rewardToken = _rewardToken;
        ls.itoProxy = _itoProxy;
        ls.nextPoolNonce = 0;
        ls.version = 1;
    }

    function poolExists(bytes8 poolId) public view returns (bool) {
        LiquidityStorage storage ls = liquidityStorage();
        if (ls.poolConfigs[poolId].tokenA == address(0) || ls.poolConfigs[poolId].tokenB == address(0)) {
            return false;
        }
        return true;
    }

    function validatePoolConfig(address tokenA, address tokenB) internal view returns (bytes8) {
        LiquidityStorage storage ls = liquidityStorage();

        // Compute Pool Id
        bytes8 poolId = encodePoolId(tokenA, tokenB, ls.nextPoolNonce, ls.version);

        // Ensure that Pool does not already exist
        if (poolExists(poolId)) {
            revert PoolAlreadyExists(poolId);
        }

        // Check for Duplicate Tokens
        if (tokenA == tokenB) {
            revert DuplicateToken(tokenA);
        }

        // Check for Zero Addresses
        if (tokenA == address(0) || tokenB == address(0)) {
            revert ZeroAddress();
        }

        return poolId;
    }

    /// @notice Extracts the last 8 bytes (rightmost) from a bytes32 value
    /// @param data The input bytes32
    /// @return result The extracted 8 bytes, in network (big‑endian) order
    function last8bytes(bytes32 data) public pure returns (bytes8 result) {
        return bytes8(uint64(uint256(data)));
    }

    /// @custom:future In future rewrite this to use bit-packed pool ids with a pool factory as used by Balancer
    /// eg- 20 B pool address | 2 B specialization | 10 B nonce
    function encodePoolId(address tokenA, address tokenB, uint80 nextPoolNonce, uint8 version)
        public
        pure
        returns (bytes8 poolId)
    {
        // Pool Id = last8Bytes(keccak(tokenA,tokenB,nonce,version))
        poolId = last8bytes(keccak256(abi.encodePacked(tokenA, tokenB, nextPoolNonce, version)));
    }
}
