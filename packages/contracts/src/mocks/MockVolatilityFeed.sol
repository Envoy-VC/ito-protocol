// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract MockVolatilityFeed is AggregatorV3Interface, Ownable {
    int256 public volatility;

    error NotImplemented();

    constructor(address initialOwner, int256 _volatility) Ownable(initialOwner) {
        volatility = _volatility;
    }

    function decimals() external pure returns (uint8) {
        return 5;
    }

    function description() external pure returns (string memory) {
        return "ETH 30d Volatility";
    }

    function version() external pure returns (uint256) {
        return 1;
    }

    function latestRoundData()
        external
        view
        returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)
    {
        return (0, volatility, 0, 0, 0);
    }

    function getRoundData(uint80)
        external
        view
        returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)
    {
        return (0, volatility, 0, 0, 0);
    }

    function setVolatility(int256 _volatility) external onlyOwner {
        volatility = _volatility;
    }
}
