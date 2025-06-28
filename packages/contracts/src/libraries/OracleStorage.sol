// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

library OracleStorageLib {
    bytes32 constant ORACLE_STORAGE_POSITION = keccak256("ito.protocol.treasury.storage");

    error AlreadyInitialized();

    struct OracleStorage {
        address priceFeedAggregator;
        address volatilityAggregator;
        address vrfCoordinator;
        bytes32 keyHash;
        uint32 callbackGasLimit;
        uint16 requestConfirmations;
        uint32 numKeywords;
    }

    function oracleStorage() internal pure returns (OracleStorage storage os) {
        bytes32 position = ORACLE_STORAGE_POSITION;
        assembly {
            os.slot := position
        }
    }

    function initOracleStorage(address _priceFeedAggregator, address _volatilityAggregator, address _vrfCoordinator)
        internal
    {
        OracleStorage storage ts = oracleStorage();
        if (ts.priceFeedAggregator != address(0) || ts.volatilityAggregator != address(0)) {
            revert AlreadyInitialized();
        }
        ts.priceFeedAggregator = _priceFeedAggregator;
        ts.volatilityAggregator = _volatilityAggregator;
        ts.vrfCoordinator = _vrfCoordinator;
        // 300 gwei gas lane on Avalanche Fuji
        ts.keyHash = 0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae;
        ts.callbackGasLimit = 300000;
        ts.requestConfirmations = 1;
        ts.numKeywords = 1;
    }
}
