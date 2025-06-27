// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

library EmergencyStorageLib {
    bytes32 constant EMERGENCY_STORAGE_POSITION =
        keccak256("ito.protocol.emergency.storage");

    event Paused(address account);
    event Unpaused(address account);

    error AlreadyPaused();
    error NotPaused();

    struct EmergencyStorage {
        bool paused;
    }

    function emergencyStorage()
        internal
        pure
        returns (EmergencyStorage storage os)
    {
        bytes32 position = EMERGENCY_STORAGE_POSITION;
        assembly {
            os.slot := position
        }
    }

    function whenNotPaused() internal view {
        EmergencyStorage storage es = emergencyStorage();
        if (es.paused) {
            revert NotPaused();
        }
    }
}
