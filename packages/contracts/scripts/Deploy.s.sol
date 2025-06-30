// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Script, console} from "forge-std/Script.sol";

// Proxy
import {ItoProxy} from "src/ItoProxy.sol";

// Facets
import {DiamondCutFacet} from "src/facets/DiamondCutFacet.sol";
import {DiamondLoupeFacet} from "src/facets/DiamondLoupeFacet.sol";
import {OwnershipFacet} from "src/facets/OwnershipFacet.sol";
import {EmergencyFacet} from "src/facets/EmergencyFacet.sol";
import {LiquidityFacet} from "src/facets/LiquidityFacet.sol";
import {TreasuryFacet} from "src/facets/TreasuryFacet.sol";
import {OracleFacet} from "src/facets/OracleFacet.sol";
import {SAMMFacet} from "src/facets/SAMMFacet.sol";

// Initializers
import {ItoInitializer} from "src/initializers/ItoInitializer.sol";

// Interfaces
import {IDiamondCut} from "src/interfaces/IDiamondCut.sol";

// Token
import {ItoToken} from "src/ItoToken.sol";

// Mocks
import {MockUSD} from "src/mocks/MockUSD.sol";
import {MockETH} from "src/mocks/MockETH.sol";
import {MockPriceFeed} from "src/mocks/MockPriceFeed.sol";
import {MockVolatilityFeed} from "src/mocks/MockVolatilityFeed.sol";

contract DeployScript is Script {
    // Proxy
    ItoProxy public itoProxy;

    // Facets
    DiamondCutFacet public diamondCutFacet;
    DiamondLoupeFacet public diamondLoupeFacet;
    OwnershipFacet public ownershipFacet;
    LiquidityFacet public liquidityFacet;
    TreasuryFacet public treasuryFacet;
    EmergencyFacet public emergencyFacet;
    OracleFacet public oracleFacet;
    SAMMFacet public sammFacet;

    // Token
    ItoToken public itoToken;

    // Subscription ID on Avalanche Fuji Testnet
    uint256 subscriptionId = 84956287292561642221643182526448656106083710917695203120917204973477962849283;
    // VRF Coordinator on Avalanche Fuji Testnet
    address vrfCoordinator = 0x5C210eF41CD1a72de73bF76eC39637bB0d3d7BEE;
    // KeyHash for 300 gwei lane on Avalanche Fuji Testnet
    bytes32 keyHash = 0xc799bd1e3bd4d1a41cd4968997a4e03dfd2a3c7c04b695881138580163f42887;

    address priceFeed = 0x86d67c3D38D2bCeE722E601025C25a575021c6EA;

    // Mocks
    MockUSD public mockUSD;
    MockETH public mockETH;
    MockPriceFeed public mockPriceFeed;
    MockVolatilityFeed public mockVolatilityFeed;

    // Initializers
    ItoInitializer public itoInit;

    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address owner = vm.addr(deployerPrivateKey);
        vm.startBroadcast(deployerPrivateKey);
        console.log("Deploying contracts with the account:", owner);
        // Deploy Diamond Cut Facet
        DiamondCutFacet _diamondCutFacet = new DiamondCutFacet();
        console.log("DiamondCutFacet deployed to:", address(_diamondCutFacet));
        // Deploy Ownership Facet
        OwnershipFacet _ownershipFacet = new OwnershipFacet();
        console.log("OwnershipFacet deployed to:", address(_ownershipFacet));

        // Deploy Proxy
        itoProxy = new ItoProxy(owner, address(_diamondCutFacet), address(_ownershipFacet));

        // Initialize Facets
        initializeFacets(address(itoProxy), owner);

        // Set Facets
        diamondCutFacet = DiamondCutFacet(address(itoProxy));
        diamondLoupeFacet = DiamondLoupeFacet(address(itoProxy));
        ownershipFacet = OwnershipFacet(address(itoProxy));
        liquidityFacet = LiquidityFacet(address(itoProxy));
        treasuryFacet = TreasuryFacet(address(itoProxy));
        emergencyFacet = EmergencyFacet(address(itoProxy));
        oracleFacet = OracleFacet(address(itoProxy));
        sammFacet = SAMMFacet(address(itoProxy));

        // Deploy Mocks
        mockUSD = new MockUSD(owner);
        console.log("Mock USD deployed to:", address(mockUSD));
        mockETH = new MockETH(owner);
        console.log("Mock ETH deployed to:", address(mockETH));
        mockVolatilityFeed = new MockVolatilityFeed(owner, 86480);
        console.log("Mock Volatility deployed to:", address(mockVolatilityFeed));

        // Create Pool
        bytes8 poolId = liquidityFacet.createPool(address(mockETH), address(mockUSD), 0);
        // Fund Rewards
        uint256 distributionPeriod = 365 days;
        itoToken.mint(owner, 100_000 ether);
        itoToken.approve(address(liquidityFacet), 100_000 ether);
        liquidityFacet.fundRewards(poolId, 100_000 ether, distributionPeriod);

        console.log("Pool Id: ");
        console.logBytes8(poolId);

        // Add Price Feed to Oracle
        oracleFacet.addFeed(poolId, address(priceFeed), address(mockVolatilityFeed));

        vm.stopBroadcast();
    }

    function initializeFacets(address _proxyAddress, address owner) internal {
        DiamondCutFacet cut = DiamondCutFacet(_proxyAddress);

        // Deploy Facets
        DiamondLoupeFacet _diamondLoupeFacet = new DiamondLoupeFacet();
        TreasuryFacet _treasuryFacet = new TreasuryFacet();
        LiquidityFacet _liquidityFacet = new LiquidityFacet();
        EmergencyFacet _emergencyFacet = new EmergencyFacet();
        OracleFacet _oracleFacet = new OracleFacet();
        SAMMFacet _sammFacet = new SAMMFacet(address(vrfCoordinator), keyHash, subscriptionId);

        // Log All Addresses
        console.log("Diamond Loupe deployed to:", address(cut));
        console.log("Treasury deployed to:", address(_treasuryFacet));
        console.log("Liquidity deployed to:", address(_liquidityFacet));
        console.log("Emergency deployed to:", address(_emergencyFacet));
        console.log("Oracle deployed to:", address(_oracleFacet));
        console.log("SAMM deployed to:", address(_sammFacet));

        // Prepare diamond cut data
        IDiamondCut.FacetCut[] memory facetCuts = new IDiamondCut.FacetCut[](6);

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
        bytes4[] memory liquiditySelectors = new bytes4[](9);
        liquiditySelectors[0] = LiquidityFacet.createPool.selector;
        liquiditySelectors[1] = LiquidityFacet.addLiquidity.selector;
        liquiditySelectors[2] = LiquidityFacet.removeLiquidity.selector;
        liquiditySelectors[3] = LiquidityFacet.getPoolState.selector;
        liquiditySelectors[4] = LiquidityFacet.fundRewards.selector;
        liquiditySelectors[5] = LiquidityFacet.getPoolConfig.selector;
        liquiditySelectors[6] = LiquidityFacet.getUserPosition.selector;
        liquiditySelectors[7] = LiquidityFacet.poolExists.selector;
        liquiditySelectors[8] = LiquidityFacet._updatePoolAndTransferAfterSwap.selector;
        facetCuts[3] = IDiamondCut.FacetCut({
            facetAddress: address(_liquidityFacet),
            action: IDiamondCut.FacetCutAction.Add,
            functionSelectors: liquiditySelectors
        });

        // Oracle Facet
        bytes4[] memory oracleSelectors = new bytes4[](3);
        oracleSelectors[0] = OracleFacet.getLatestPrice.selector;
        oracleSelectors[1] = OracleFacet.getLatestVolatility.selector;
        oracleSelectors[2] = OracleFacet.addFeed.selector;
        facetCuts[4] = IDiamondCut.FacetCut({
            facetAddress: address(_oracleFacet),
            action: IDiamondCut.FacetCutAction.Add,
            functionSelectors: oracleSelectors
        });

        // SAMM Facet
        bytes4[] memory sammSelectors = new bytes4[](2);
        sammSelectors[0] = SAMMFacet.swap.selector;
        // rawFulfillRandomWords(uint256,uint256[])
        sammSelectors[1] = 0x1fe543e3;
        facetCuts[5] = IDiamondCut.FacetCut({
            facetAddress: address(_sammFacet),
            action: IDiamondCut.FacetCutAction.Add,
            functionSelectors: sammSelectors
        });

        address o = owner;

        // Deploy Initializer
        itoInit = new ItoInitializer();
        console.log("ItoInitializer deployed to:", address(itoInit));

        // Deploy Reward Token
        itoToken = new ItoToken(owner);
        console.log("ItoToken deployed to:", address(itoToken));

        // Add Facet Cuts with Initializer
        cut.diamondCut(
            facetCuts,
            address(itoInit),
            abi.encodeWithSelector(ItoInitializer.init.selector, o, address(itoToken), address(itoProxy))
        );
    }
}

// TODO:
// 1. Add Proxy as consumer to VRF Coordinator

// https://api.routescan.io/v2/network/testnet/evm/43113/etherscan

// forge script scripts/Deploy.s.sol:DeployScript --broadcast --rpc-url https://avalanche-fuji-c-chain-rpc.publicnode.com --verifier-url 'https://api.routescan.io/v2/network/testnet/evm/43113/etherscan' --etherscan-api-key "verifyContract" --verify -vvvv

// forge script scripts/Deploy.s.sol:DeployScript --fork-url https://avalanche-fuji-c-chain-rpc.publicnode.com --dry-run
