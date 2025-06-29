import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import type { Abi } from "viem";

// Tokens
import { abi as itoTokenAbi } from "../../packages/contracts/out/ItoToken.sol/ItoToken.json";
// Facets
import { abi as liquidityFacetAbi } from "../../packages/contracts/out/LiquidityFacet.sol/LiquidityFacet.json";
import { abi as mockETHAbi } from "../../packages/contracts/out/MockETH.sol/MockETH.json";
import { abi as mockUSDAbi } from "../../packages/contracts/out/MockUSD.sol/MockUSD.json";
import { abi as sammFacetAbi } from "../../packages/contracts/out/SAMMFacet.sol/SAMMFacet.json";
import { abi as oracleFacetAbi } from "../../packages/contracts/out/OracleFacet.sol/OracleFacet.json";

const itoProxyAddress = "0x2aB1B11bbbC3ef58ca7b3595103511C9Ea36eFb6";

const itoTokenAddress = "0xBCa528fCc1Ec19fC103Ea855BB3E371465eF74F0";
const mockETHAddress = "0x1a522B6e68fE4ec21f3ddFC590dfb0957B91d86c";
const mockUSDAddress = "0xC94e5f5E4829b2b9AC8938E7Fe4695F6ec1B9145";

// Deploying contracts with the account: 0x9A36a8EDAF9605F7D4dDC72F4D81463fb6f841d8
// DiamondCutFacet deployed to: 0x731f26C7c96D085DEbfF627b6d2b2702Bd7B347f
// OwnershipFacet deployed to: 0x8224a89C1Bc86271C979365830c837071fD1F1A6
// Diamond Loupe deployed to: 0x2aB1B11bbbC3ef58ca7b3595103511C9Ea36eFb6
// Treasury deployed to: 0xB4e0F93aA4C10333F1B43A4a073C705ed9d0D707
// Liquidity deployed to: 0x9367821312Df33f4634b159E45039c8D814BA97f
// Emergency deployed to: 0x2CA12Ac2CB30B9acBdB6d9c7dcFC895338904A93
// Oracle deployed to: 0xE2567B2A7214877D395Dfa6ca72335644B26dC23
// SAMM deployed to: 0xc77ab300b6270dA732b137a592Ce54c468859dEf
// ItoInitializer deployed to: 0x0e561F34e023330D56AfB3b5Af082D5AF1fBf022
// ItoToken deployed to: 0xBCa528fCc1Ec19fC103Ea855BB3E371465eF74F0
// Mock USD deployed to: 0xC94e5f5E4829b2b9AC8938E7Fe4695F6ec1B9145
// Mock ETH deployed to: 0x1a522B6e68fE4ec21f3ddFC590dfb0957B91d86c
// Mock Volatility deployed to: 0x47CD15374793577f9003D5a43b4fFCE335aA5eA2
// Pool Id:
// 0xfaa3722d88d453bb

export default defineConfig({
  contracts: [
    {
      abi: liquidityFacetAbi as Abi,
      address: itoProxyAddress,
      name: "LiquidityFacet",
    },
    {
      abi: sammFacetAbi as Abi,
      address: itoProxyAddress,
      name: "SAMMFacet",
    },
    {
      abi: oracleFacetAbi as Abi,
      address: itoProxyAddress,
      name: "OracleFacet",
    },
    {
      abi: itoTokenAbi as Abi,
      address: itoTokenAddress,
      name: "ItoToken",
    },
    {
      abi: mockETHAbi as Abi,
      address: mockETHAddress,
      name: "MockETH",
    },
    {
      abi: mockUSDAbi as Abi,
      address: mockUSDAddress,
      name: "MockUSD",
    },
  ],
  out: "src/__generated__/wagmi.ts",
  plugins: [react()],
});
