// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ItoProxyLib} from "../libraries/ItoProxyLib.sol";

// Interfaces
import {IDiamondLoupe} from "../interfaces/IDiamondLoupe.sol";
import {IDiamondCut} from "../interfaces/IDiamondCut.sol";
import {IERC173} from "../interfaces/IERC173.sol";
import {IERC165} from "@openzeppelin/contracts/interfaces/IERC165.sol";

// Storage
import {TreasuryStorageLib} from "../libraries/TreasuryStorage.sol";
import {LiquidityStorageLib} from "../libraries/LiquidityStorage.sol";
import {OracleStorageLib} from "../libraries/OracleStorage.sol";

/// @title ItoInitializer
/// @notice Initialization contract for the Ito Diamond proxy
/// @dev This contract is responsible for initializing the diamond proxy with required interfaces
/// and any custom state variables. It is called during the diamond deployment or upgrade process
/// through the diamondCut function.
contract ItoInitializer {
    /// @notice Initializes the diamond proxy with required interfaces and state variables
    function init(address _treasury, address _rewardToken, address _itoProxy) public {
        // adding ERC165 data
        ItoProxyLib.DiamondStorage storage ds = ItoProxyLib.diamondStorage();
        ds.supportedInterfaces[type(IERC165).interfaceId] = true;
        ds.supportedInterfaces[type(IDiamondCut).interfaceId] = true;
        ds.supportedInterfaces[type(IDiamondLoupe).interfaceId] = true;
        ds.supportedInterfaces[type(IERC173).interfaceId] = true;

        TreasuryStorageLib.initTreasuryStorage(_treasury);
        LiquidityStorageLib.initLiquidityStorage(_rewardToken, _itoProxy);
        OracleStorageLib.initOracleStorage(_itoProxy);
    }
}
