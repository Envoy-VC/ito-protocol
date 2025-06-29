// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Test, console2 as console, Vm} from "forge-std/Test.sol";

import {SetUp} from "./base/SetUp.sol";

// Libraries
import {ItoProxyLib} from "../src/libraries/ItoProxyLib.sol";

// Interfaces
import {IDiamondLoupe} from "../src/interfaces/IDiamondLoupe.sol";

contract ItoProxyTests is Test, SetUp {
    function setUp() public virtual override {
        super.setUp();
    }

    function test_deployment() public view {
        console.log("Deployed ItoProxy at:", address(itoProxy));
        console.log("Contract Owner:", ownershipFacet.owner());
    }

    function test_facets() public view {
        IDiamondLoupe.Facet[] memory facets = diamondLoupeFacet.facets();
        assertEq(facets.length, 8);
    }
}
