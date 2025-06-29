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

const itoProxyAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
const itoTokenAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
const mockETHAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
const mockUSDAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

export default defineConfig({
	out: "src/__generated__/wagmi.ts",
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
	plugins: [react()],
});
