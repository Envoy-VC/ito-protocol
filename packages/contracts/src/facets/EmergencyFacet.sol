// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {OwnershipStorageLib} from "../libraries/OwnershipStorage.sol";
import {EmergencyStorageLib} from "../libraries/EmergencyStorage.sol";

contract EmergencyFacet {
    event Paused(address account);
    event Unpaused(address account);

    error AlreadyPaused();
    error NotPaused();

    function isPaused() public view returns (bool) {
        return EmergencyStorageLib.emergencyStorage().paused;
    }

    function pause() public {
        OwnershipStorageLib._enforceContractOwner();
        EmergencyStorageLib.EmergencyStorage storage es = EmergencyStorageLib
            .emergencyStorage();
        if (es.paused) {
            revert NotPaused();
        }
        es.paused = true;
        emit Paused(msg.sender);
    }

    function unpause() public {
        OwnershipStorageLib._enforceContractOwner();
        EmergencyStorageLib.EmergencyStorage storage es = EmergencyStorageLib
            .emergencyStorage();
        if (!es.paused) {
            revert NotPaused();
        }
        es.paused = false;
        emit Unpaused(msg.sender);
    }

    function whenNotPaused() public view {
        EmergencyStorageLib.EmergencyStorage storage es = EmergencyStorageLib
            .emergencyStorage();
        if (es.paused) {
            revert NotPaused();
        }
    }
}
