// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

library OracleStorageLib {
    bytes32 constant ORACLE_STORAGE_POSITION = keccak256("ito.protocol.oracle.storage");

    error AlreadyInitialized();

    struct OracleStorage {
        mapping(bytes8 => address) priceFeedAggregators;
        mapping(bytes8 => address) volatilityAggregators;
        address itoProxy;
    }

    function oracleStorage() internal pure returns (OracleStorage storage os) {
        bytes32 position = ORACLE_STORAGE_POSITION;
        assembly {
            os.slot := position
        }
    }

    function initOracleStorage(address _itoProxy) public {
        OracleStorage storage os = oracleStorage();
        if (os.itoProxy != address(0)) {
            revert AlreadyInitialized();
        }
        os.itoProxy = _itoProxy;
    }
}
