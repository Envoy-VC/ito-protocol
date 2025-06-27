import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import type { Abi } from "viem";

import { abi as counterAbi } from "../../packages/contracts/out/Counter.sol/Counter.json";

export default defineConfig({
	out: "src/__generated__/wagmi.ts",
	contracts: [
		{
			abi: counterAbi as Abi,
			address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
			name: "Counter",
		},
	],
	plugins: [react()],
});
