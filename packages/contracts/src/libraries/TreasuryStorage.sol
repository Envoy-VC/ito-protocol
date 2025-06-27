// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

library TreasuryStorageLib {
    bytes32 constant TREASURY_STORAGE_POSITION =
        keccak256("ito.protocol.treasury.storage");

    struct TreasuryStorage {
        address treasury;
    }

    function treasuryStorage()
        internal
        pure
        returns (TreasuryStorage storage os)
    {
        bytes32 position = TREASURY_STORAGE_POSITION;
        assembly {
            os.slot := position
        }
    }
}
