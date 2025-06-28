// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {OracleStorageLib} from "../libraries/OracleStorage.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";
import {SafeCast} from "@openzeppelin/contracts/utils/math/SafeCast.sol";

contract OracleFacet {
    error PriceFeedNotFound();
    error VolatilityFeedNotFound();

    function getLatestPrice(bytes8 poolId) public view returns (uint256) {
        OracleStorageLib.OracleStorage storage os = OracleStorageLib.oracleStorage();
        AggregatorV3Interface priceFeed = AggregatorV3Interface(os.priceFeedAggregators[poolId]);
        if (address(priceFeed) == address(0)) {
            revert PriceFeedNotFound();
        }

        (, int256 answer,,,) = priceFeed.latestRoundData();
        uint8 feedDecimals = priceFeed.decimals();
        uint256 casted = SafeCast.toUint256(answer);
        uint256 answerWith18 = casted * (10 ** (18 - feedDecimals));

        return answerWith18;
    }

    function getLatestVolatility(bytes8 poolId) public view returns (uint256) {
        OracleStorageLib.OracleStorage storage os = OracleStorageLib.oracleStorage();
        AggregatorV3Interface volatilityFeed = AggregatorV3Interface(os.priceFeedAggregators[poolId]);
        if (address(volatilityFeed) == address(0)) {
            revert VolatilityFeedNotFound();
        }

        (, int256 answer,,,) = volatilityFeed.latestRoundData();
        uint8 feedDecimals = volatilityFeed.decimals();
        uint256 casted = SafeCast.toUint256(answer);
        uint256 answerWith18 = (casted * (10 ** (18 - feedDecimals)));
        return answerWith18;
    }
}
