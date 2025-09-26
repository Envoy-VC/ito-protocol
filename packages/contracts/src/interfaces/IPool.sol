// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

interface IPool {
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
}
