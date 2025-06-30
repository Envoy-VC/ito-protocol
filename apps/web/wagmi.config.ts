import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import type { Abi } from "viem";

import { abi as itoProxyAbi } from "../../packages/contracts/out/ItoProxy.sol/ItoProxy.json";
// Tokens
import { abi as itoTokenAbi } from "../../packages/contracts/out/ItoToken.sol/ItoToken.json";
// Facets
import { abi as liquidityFacetAbi } from "../../packages/contracts/out/LiquidityFacet.sol/LiquidityFacet.json";
import { abi as mockETHAbi } from "../../packages/contracts/out/MockETH.sol/MockETH.json";
import { abi as mockUSDAbi } from "../../packages/contracts/out/MockUSD.sol/MockUSD.json";
import { abi as oracleFacetAbi } from "../../packages/contracts/out/OracleFacet.sol/OracleFacet.json";
import { abi as sammFacetAbi } from "../../packages/contracts/out/SAMMFacet.sol/SAMMFacet.json";

const itoProxyAddress = "0xD7Bc5aEB90efCE77Cdcf42358909D694447f9F20";

const itoTokenAddress = "0x96D48eE5A4C3B7458359D34AFAD1d33B2D51D575";
const mockETHAddress = "0xee485ad3d6dF672752291a60002AD48E1573F2D4";
const mockUSDAddress = "0xD4b157E827dCDE062c7A831fc5a77A71AFD5f283";

// Deploying contracts with the account: 0x9A36a8EDAF9605F7D4dDC72F4D81463fb6f841d8
// DiamondCutFacet deployed to: 0xEd97fcA2b3d7958e7A5Dc508ba0159a3C948Ba7d
// OwnershipFacet deployed to: 0x1807157EFee309A18C05C5d6057B3C1389Fa8c01
// Diamond Loupe deployed to: 0x6048d64eFbEAFEf6C7D03b8cAB7EdeaaF8bdA7ab
// Treasury deployed to: 0xf105049F2341918a5f25904B1b5A393Ae2f7470d
// Liquidity deployed to: 0xbEfD55dc9e3cd8C8c6CAC1ae5EdBCC93F2aDe6A0
// Emergency deployed to: 0xab990Dbb6ccF3Dec5f5B44776BF67B386CCC513f
// Oracle deployed to: 0xA10DBbB26fF484a7a2271ee5ae1aA0be4289feC7
// SAMM deployed to: 0x576d3d8d4972C834303bC39F4727bb9Bdeb1a96f
// ItoInitializer deployed to: 0x6B4662aA0f1BB7e66467f811174F74B13Da03d2c
// ItoToken deployed to: 0xfFe0B669AADf06a59D37e13246E58d1d90bFeeB7
// Mock USD deployed to: 0x72c290C55E5C836dbB05ff7cA3948AB2AaFb8917
// Mock ETH deployed to: 0x23fb3A2CAe9dC42111B1430a1A091c8a7111903b
// Mock Volatility deployed to: 0x75436f3D74CcAcB1Fa507B827420B08Fb571D9bc
// Pool Id:
// 0xc45ce3f10ee8e552

export default defineConfig({
  contracts: [
    {
      abi: itoProxyAbi as Abi,
      address: itoProxyAddress,
      name: "ItoProxy",
    },
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
