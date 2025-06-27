// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {OwnershipStorageLib} from "../libraries/OwnershipStorage.sol";
import {EmergencyStorageLib} from "../libraries/EmergencyStorage.sol";

contract EmergencyFacet {
    function isPaused() public view returns (bool) {
        return EmergencyStorageLib.emergencyStorage().paused;
    }

    function pause() public {
        OwnershipStorageLib.enforceContractOwner();
        EmergencyStorageLib.EmergencyStorage storage es = EmergencyStorageLib
            .emergencyStorage();
        if (es.paused) {
            revert EmergencyStorageLib.NotPaused();
        }
        es.paused = true;
        emit EmergencyStorageLib.Paused(msg.sender);
    }

    function unpause() public {
        OwnershipStorageLib.enforceContractOwner();
        EmergencyStorageLib.EmergencyStorage storage es = EmergencyStorageLib
            .emergencyStorage();
        if (!es.paused) {
            revert EmergencyStorageLib.NotPaused();
        }
        es.paused = false;
        emit EmergencyStorageLib.Unpaused(msg.sender);
    }
}
