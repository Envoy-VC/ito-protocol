// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {IDiamondCut} from "../interfaces/IDiamondCut.sol";
import {OwnershipStorageLib} from "../libraries/OwnershipStorage.sol";
import {ItoProxyLib} from "../libraries/ItoProxyLib.sol";

/// @title DiamondCutFacet
/// @notice Facet implementing the diamond cut functionality for the proxy
/// @dev This facet provides the core upgrade mechanism for the diamond proxy pattern,
/// allowing the addition, replacement, and removal of contract functions
contract DiamondCutFacet is IDiamondCut {
    /// @notice Performs a diamond cut operation to modify the proxy's facets
    /// @dev This function:
    /// 1. Enforces that the caller is the contract owner
    /// 2. Executes the diamond cut operation through ItoProxyLib
    /// @param _diamondCut Array of FacetCut structs containing the modifications to perform
    /// @param _init Address of the initialization contract (if any)
    /// @param _calldata Calldata to be passed to the initialization contract
    function diamondCut(FacetCut[] calldata _diamondCut, address _init, bytes calldata _calldata) external override {
        OwnershipStorageLib._enforceContractOwner();
        ItoProxyLib.diamondCut(_diamondCut, _init, _calldata);
    }
}
