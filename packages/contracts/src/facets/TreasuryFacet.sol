// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {OwnershipStorageLib} from "../libraries/OwnershipStorage.sol";
import {TreasuryStorageLib} from "../libraries/TreasuryStorage.sol";

contract TreasuryFacet {
    function treasury() public view returns (address) {
        return TreasuryStorageLib.treasuryStorage().treasury;
    }

    function setTreasury(address newTreasury) public {
        OwnershipStorageLib._enforceContractOwner();
        TreasuryStorageLib.TreasuryStorage storage ts = TreasuryStorageLib
            .treasuryStorage();
        ts.treasury = newTreasury;
    }
}
