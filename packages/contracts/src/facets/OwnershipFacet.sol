// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {OwnershipStorageLib} from "../libraries/OwnershipStorage.sol";

contract OwnershipFacet {
    error NotOwner();
    error ZeroAddress();

    event OwnershipTransferStarted(address indexed previousOwner, address indexed newOwner);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    function owner() public view returns (address) {
        return OwnershipStorageLib.ownershipStorage().owner;
    }

    function transferOwnership(address newOwner) external {
        OwnershipStorageLib.OwnershipStorage storage os = OwnershipStorageLib.ownershipStorage();
        if (msg.sender != os.owner) {
            revert NotOwner();
        }
        if (newOwner == address(0)) {
            revert ZeroAddress();
        }
        os.pendingOwner = newOwner;
        emit OwnershipTransferStarted(os.owner, newOwner);
    }

    function acceptOwnership() external {
        OwnershipStorageLib.OwnershipStorage storage os = OwnershipStorageLib.ownershipStorage();
        if (msg.sender != os.pendingOwner) {
            revert NotOwner();
        }
        emit OwnershipTransferred(os.owner, os.pendingOwner);
        os.owner = os.pendingOwner;
        os.pendingOwner = address(0);
    }

    function enforceContractOwner() public view {
        OwnershipStorageLib._enforceContractOwner();
    }
}
