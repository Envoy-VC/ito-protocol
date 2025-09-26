// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

// Interfaces
import {IPool} from "./interfaces/IPool.sol";

contract ItoPool is IPool {
    address public immutable tokenA;
    address public immutable tokenB;
    uint256 public immutable baseRewardRate;

    PoolState public poolState;
    mapping(address => UserPosition) public userPositions;

    constructor(address _tokenA, address _tokenB, uint256 _baseRewardRate) {
        tokenA = _tokenA;
        tokenB = _tokenB;
        baseRewardRate = _baseRewardRate;

        poolState =
            PoolState({reserveA: 0, reserveB: 0, totalLPTokens: 0, lastUpdate: block.timestamp, accRewardPerShare: 0});
    }
}
