// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

interface IPool {
    error InsufficientAmount(address token);
    error InsufficientLiquidity();
    error InsufficientReserves(address token);

    error InvalidAmount();

    error RequestAlreadyFulfilled();

    event LiquidityAdded(address indexed provider, uint256 amountA, uint256 amountB, uint256 liquidity);

    event LiquidityRemoved(address indexed provider, uint256 amountA, uint256 amountB, uint256 liquidity);

    event RewardsClaimed(address indexed user, uint256 amount);

    event SwapInitiated(uint256 indexed requestId, address indexed user, address tokenIn, uint256 amountIn);
    event SwapCompleted(uint256 indexed requestId, uint256 amountOut, uint256 feeCharged);

    struct UserPosition {
        uint256 lpTokens;
        uint256 rewardDebt; // Reward debt for accounting
        uint256 lastInteraction; // Timestamp of last interaction
    }

    struct PoolState {
        uint256 reserveA;
        uint256 reserveB;
        uint256 totalLPTokens;
        uint256 lastUpdate;
        uint256 accRewardPerShare; // Accumulated rewards per LP token (1e18 precision)
    }

    struct SwapRequest {
        uint256 amountIn;
        uint256 amountOut;
        uint256 timestamp;
        uint256 fee;
        address user;
        address tokenIn;
        uint8 errorCode;
        bool isError;
        bool isFulfilled;
    }

    /// @notice Add liquidity to the pool
    /// @param amountADesired The amount of tokenA desired
    /// @param amountBDesired The amount of tokenB desired
    /// @return amountA The amount of tokenA added
    /// @return amountB The amount of tokenB added
    /// @return liquidity The amount of LP tokens minted
    function addLiquidity(uint256 amountADesired, uint256 amountBDesired)
        external
        returns (uint256 amountA, uint256 amountB, uint256 liquidity);

    /// @notice Remove liquidity from the pool
    /// @param liquidity The amount of LP tokens to burn
    function removeLiquidity(uint256 liquidity) external;

    /// @notice Claim pending rewards for a user
    /// @param user The address of the user
    /// @dev Internally Calculates amount of reward token for LP and transfers to user
    function claimRewards(address user) external;

    /// @notice Get amount of pending rewards for a user
    /// @param user The address of the user
    function pendingRewards(address user) external view returns (uint256);

    /// @notice Initiate a swap
    /// @param tokenIn The address of the token to swap
    /// @param amountIn The amount of token to swap
    /// @return requestId The ID of the swap request
    function swap(address tokenIn, uint256 amountIn) external returns (uint256);

    /// @notice Get the current state of the pool
    /// @return poolState The current state of the pool
    function getPoolState() external view returns (PoolState memory);

    /// @notice Get the user's position in the pool
    /// @param user The address of the user
    /// @return userPosition The user's position in the pool
    function getUserPosition(address user) external view returns (UserPosition memory);
}
