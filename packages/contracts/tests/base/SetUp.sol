// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Test, console2 as console, Vm} from "forge-std/Test.sol";

// Proxy
import {ItoProxy} from "../../src/ItoProxy.sol";

// Facets
import {DiamondCutFacet} from "../../src/facets/DiamondCutFacet.sol";
import {DiamondLoupeFacet} from "../../src/facets/DiamondLoupeFacet.sol";
import {OwnershipFacet} from "../../src/facets/OwnershipFacet.sol";

// Initializers
import {ItoInitializer} from "../../src/initializers/ItoInitializer.sol";

// Libraries
import {ItoProxyLib} from "../../src/libraries/ItoProxyLib.sol";

// Interfaces
import {IDiamondCut} from "../../src/interfaces/IDiamondCut.sol";

contract SetUp is Test {
    Vm.Wallet public owner;

    // Proxy
    ItoProxy public itoProxy;

    // Facets
    DiamondCutFacet public diamondCutFacet;
    DiamondLoupeFacet public diamondLoupeFacet;
    OwnershipFacet public ownershipFacet;

    // Initializers
    ItoInitializer public itoInit;

    bool public __setUpDone;

    function testDeployIto() public {
        // Prevents being counted in Foundry Coverage
    }

    function setUp() public virtual {
        if (__setUpDone) {
            return;
        }
        owner = vm.createWallet("owner");
        vm.startBroadcast(owner.addr);

        // Deploy Diamond Cut Facet
        DiamondCutFacet _diamondCutFacet = new DiamondCutFacet();
        // Deploy Ownership Facet
        OwnershipFacet _ownershipFacet = new OwnershipFacet();

        // Deploy Proxy
        itoProxy = new ItoProxy(
            owner.addr,
            address(_diamondCutFacet),
            address(_ownershipFacet)
        );

        // Initialize Facets
        initializeFacets(address(itoProxy));

        // Set Facets
        diamondCutFacet = DiamondCutFacet(address(itoProxy));
        diamondLoupeFacet = DiamondLoupeFacet(address(itoProxy));
        ownershipFacet = OwnershipFacet(address(itoProxy));

        vm.stopBroadcast();

        __setUpDone = true;
    }

    function initializeFacets(address _proxyAddress) internal {
        DiamondCutFacet cut = DiamondCutFacet(_proxyAddress);

        // Deploy Facets
        DiamondLoupeFacet _diamondLoupeFacet = new DiamondLoupeFacet();

        // Prepare diamond cut data
        IDiamondCut.FacetCut[] memory facetCuts = new IDiamondCut.FacetCut[](1);

        // Diamond Loupe Facet
        bytes4[] memory diamondLoupeSelectors = new bytes4[](6);
        diamondLoupeSelectors[0] = DiamondLoupeFacet.facets.selector;
        diamondLoupeSelectors[1] = DiamondLoupeFacet
            .facetFunctionSelectors
            .selector;
        diamondLoupeSelectors[2] = DiamondLoupeFacet.facetAddresses.selector;
        diamondLoupeSelectors[3] = DiamondLoupeFacet.facetAddress.selector;
        diamondLoupeSelectors[4] = DiamondLoupeFacet.supportsInterface.selector;
        facetCuts[0] = IDiamondCut.FacetCut({
            facetAddress: address(_diamondLoupeFacet),
            action: IDiamondCut.FacetCutAction.Add,
            functionSelectors: diamondLoupeSelectors
        });

        // Deploy Initializer
        itoInit = new ItoInitializer();

        // Add Facet Cuts with Initializer
        cut.diamondCut(
            facetCuts,
            address(itoInit),
            abi.encodeWithSelector(ItoInitializer.init.selector)
        );
    }
}
