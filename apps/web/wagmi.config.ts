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

const itoProxyAddress = "0x90d7F4E09415FCC36fF860e56e40330B09E2dBD8";

const itoTokenAddress = "0x724a39308024ECc6f78121113F14a07383522E8F";
const mockETHAddress = "0xD57622C4fa83ff905c3759cE43F4a0E34f812470";
const mockUSDAddress = "0x8B2421509a49bAC33A3c19133F60B3187Da34514";

// Deploying contracts with the account: 0x9A36a8EDAF9605F7D4dDC72F4D81463fb6f841d8
// DiamondCutFacet deployed to: 0xce27ADed623Ee8e44caC94B756f21f9A22A76644
// OwnershipFacet deployed to: 0x9a15bB682f36499e2359fe799a39296b1854Fc5F
// Diamond Loupe deployed to: 0x90d7F4E09415FCC36fF860e56e40330B09E2dBD8
// Treasury deployed to: 0xf32713199d3CA492B8f202fd1C2Ea50B7b95febA
// Liquidity deployed to: 0x5EB28617bD276DCA00bfD76047B85CE122f73F05
// Emergency deployed to: 0xb16dBe3d99aA60BbC8cD8ED89275FFa27F91C393
// Oracle deployed to: 0x98a76313c5F504f0EB6f9E57cdfb7e1ff5Ca6C73
// SAMM deployed to: 0x14DF2A4c1E70edad89476853a6cEC32Cb21e9300
// ItoInitializer deployed to: 0x36d9620916a78777Ea7c4194cAa80B97c4F1BCfA
// ItoToken deployed to: 0x724a39308024ECc6f78121113F14a07383522E8F
// Mock USD deployed to: 0x8B2421509a49bAC33A3c19133F60B3187Da34514
// Mock ETH deployed to: 0xD57622C4fa83ff905c3759cE43F4a0E34f812470
// Mock Volatility deployed to: 0x8B8d51005d88cCc1C66AfC8B613383DE519457bB
// Pool Id:
// 0x0032627235a380cd

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
