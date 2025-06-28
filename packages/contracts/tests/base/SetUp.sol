// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Test, console2 as console, Vm} from "forge-std/Test.sol";

// Proxy
import {ItoProxy} from "../../src/ItoProxy.sol";

// Facets
import {DiamondCutFacet} from "../../src/facets/DiamondCutFacet.sol";
import {DiamondLoupeFacet} from "../../src/facets/DiamondLoupeFacet.sol";
import {OwnershipFacet} from "../../src/facets/OwnershipFacet.sol";
import {EmergencyFacet} from "../../src/facets/EmergencyFacet.sol";
import {LiquidityFacet} from "../../src/facets/LiquidityFacet.sol";
import {TreasuryFacet} from "../../src/facets/TreasuryFacet.sol";

// Initializers
import {ItoInitializer} from "../../src/initializers/ItoInitializer.sol";

// Libraries
import {ItoProxyLib} from "../../src/libraries/ItoProxyLib.sol";

// Interfaces
import {IDiamondCut} from "../../src/interfaces/IDiamondCut.sol";

// Token
import {ItoToken} from "../../src/ItoToken.sol";

// Mocks
import {MockUSD} from "../../src/mocks/MockUSD.sol";
import {MockETH} from "../../src/mocks/MockETH.sol";

contract SetUp is Test {
    Vm.Wallet public owner;
    Vm.Wallet public treasury;

    // Misc Wallets
    Vm.Wallet public alice;
    Vm.Wallet public bob;
    Vm.Wallet public charlie;

    // Proxy
    ItoProxy public itoProxy;

    // Facets
    DiamondCutFacet public diamondCutFacet;
    DiamondLoupeFacet public diamondLoupeFacet;
    OwnershipFacet public ownershipFacet;
    LiquidityFacet public liquidityFacet;
    TreasuryFacet public treasuryFacet;
    EmergencyFacet public emergencyFacet;

    // Token
    ItoToken public itoToken;

    // Mocks
    MockUSD public mockUSD;
    MockETH public mockETH;

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
        treasury = vm.createWallet("treasury");
        alice = vm.createWallet("alice");
        bob = vm.createWallet("bob");
        charlie = vm.createWallet("charlie");
        vm.startBroadcast(owner.addr);

        // Deploy Diamond Cut Facet
        DiamondCutFacet _diamondCutFacet = new DiamondCutFacet();
        // Deploy Ownership Facet
        OwnershipFacet _ownershipFacet = new OwnershipFacet();

        // Deploy Proxy
        itoProxy = new ItoProxy(owner.addr, address(_diamondCutFacet), address(_ownershipFacet));

        // Initialize Facets
        initializeFacets(address(itoProxy));

        // Set Facets
        diamondCutFacet = DiamondCutFacet(address(itoProxy));
        diamondLoupeFacet = DiamondLoupeFacet(address(itoProxy));
        ownershipFacet = OwnershipFacet(address(itoProxy));
        liquidityFacet = LiquidityFacet(address(itoProxy));
        treasuryFacet = TreasuryFacet(address(itoProxy));
        emergencyFacet = EmergencyFacet(address(itoProxy));

        // Deploy Mocks
        mockUSD = new MockUSD(owner.addr);
        mockETH = new MockETH(owner.addr);

        _fundAccounts();

        vm.stopBroadcast();

        __setUpDone = true;
    }

    function initializeFacets(address _proxyAddress) internal {
        DiamondCutFacet cut = DiamondCutFacet(_proxyAddress);

        // Deploy Facets
        DiamondLoupeFacet _diamondLoupeFacet = new DiamondLoupeFacet();
        TreasuryFacet _treasuryFacet = new TreasuryFacet();
        LiquidityFacet _liquidityFacet = new LiquidityFacet();
        EmergencyFacet _emergencyFacet = new EmergencyFacet();

        // Prepare diamond cut data
        IDiamondCut.FacetCut[] memory facetCuts = new IDiamondCut.FacetCut[](4);

        // Diamond Loupe Facet
        bytes4[] memory diamondLoupeSelectors = new bytes4[](6);
        diamondLoupeSelectors[0] = DiamondLoupeFacet.facets.selector;
        diamondLoupeSelectors[1] = DiamondLoupeFacet.facetFunctionSelectors.selector;
        diamondLoupeSelectors[2] = DiamondLoupeFacet.facetAddresses.selector;
        diamondLoupeSelectors[3] = DiamondLoupeFacet.facetAddress.selector;
        diamondLoupeSelectors[4] = DiamondLoupeFacet.supportsInterface.selector;
        facetCuts[0] = IDiamondCut.FacetCut({
            facetAddress: address(_diamondLoupeFacet),
            action: IDiamondCut.FacetCutAction.Add,
            functionSelectors: diamondLoupeSelectors
        });

        // Treasury Facet
        bytes4[] memory treasurySelectors = new bytes4[](2);
        treasurySelectors[0] = TreasuryFacet.treasury.selector;
        treasurySelectors[1] = TreasuryFacet.setTreasury.selector;
        facetCuts[1] = IDiamondCut.FacetCut({
            facetAddress: address(_treasuryFacet),
            action: IDiamondCut.FacetCutAction.Add,
            functionSelectors: treasurySelectors
        });

        // Emergency Facet
        bytes4[] memory emergencySelectors = new bytes4[](4);
        emergencySelectors[0] = EmergencyFacet.isPaused.selector;
        emergencySelectors[1] = EmergencyFacet.pause.selector;
        emergencySelectors[2] = EmergencyFacet.unpause.selector;
        emergencySelectors[3] = EmergencyFacet.whenNotPaused.selector;
        facetCuts[2] = IDiamondCut.FacetCut({
            facetAddress: address(_emergencyFacet),
            action: IDiamondCut.FacetCutAction.Add,
            functionSelectors: emergencySelectors
        });

        // Liquidity Facet
        bytes4[] memory liquiditySelectors = new bytes4[](4);
        liquiditySelectors[0] = LiquidityFacet.createPool.selector;
        liquiditySelectors[1] = LiquidityFacet.addLiquidity.selector;
        liquiditySelectors[2] = LiquidityFacet.removeLiquidity.selector;
        liquiditySelectors[3] = LiquidityFacet.getPoolState.selector;
        facetCuts[3] = IDiamondCut.FacetCut({
            facetAddress: address(_liquidityFacet),
            action: IDiamondCut.FacetCutAction.Add,
            functionSelectors: liquiditySelectors
        });

        // Deploy Initializer
        itoInit = new ItoInitializer();

        // Deploy Reward Token
        itoToken = new ItoToken(owner.addr);

        // Add Facet Cuts with Initializer
        cut.diamondCut(
            facetCuts,
            address(itoInit),
            abi.encodeWithSelector(ItoInitializer.init.selector, treasury.addr, address(itoToken), address(itoProxy))
        );
    }

    function _fundAccounts() internal {
        vm.deal(owner.addr, 100 ether);
        vm.deal(treasury.addr, 100 ether);
        vm.deal(alice.addr, 100 ether);
        vm.deal(bob.addr, 100 ether);
        vm.deal(charlie.addr, 100 ether);

        // Mint 10 MockETH to All
        mockETH.mint(owner.addr, 10 ether);
        mockETH.mint(treasury.addr, 10 ether);
        mockETH.mint(alice.addr, 10 ether);
        mockETH.mint(bob.addr, 10 ether);
        mockETH.mint(charlie.addr, 10 ether);

        // Mint 10_000 MockUSD to All
        mockUSD.mint(owner.addr, 10_000 ether);
        mockUSD.mint(treasury.addr, 10_000 ether);
        mockUSD.mint(alice.addr, 10_000 ether);
        mockUSD.mint(bob.addr, 10_000 ether);
        mockUSD.mint(charlie.addr, 10_000 ether);
    }
}
