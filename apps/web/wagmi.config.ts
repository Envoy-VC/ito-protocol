import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import type { Abi } from "viem";

import { abi as itoPool } from "../../packages/contracts/out/ItoPool.sol/ItoPool.json";
import { abi as itoRouterAbi } from "../../packages/contracts/out/ItoRouter.sol/ItoRouter.json";
// Tokens
import { abi as itoTokenAbi } from "../../packages/contracts/out/ItoToken.sol/ItoToken.json";
import { abi as mockBTCAbi } from "../../packages/contracts/out/MockBTC.sol/MockBTC.json";
import { abi as mockOracle } from "../../packages/contracts/out/MockOracle.sol/MockOracle.json";
import { abi as mockUSDCAbi } from "../../packages/contracts/out/MockUSD.sol/MockUSDC.json";

const itoRouterAddress = "0x0000000000000000000000000000000000000000";

const mockBTCAddress = "0x0000000000000000000000000000000000000000";
const mockUSDAddress = "0x0000000000000000000000000000000000000000";

const itoTokenAddress = "0x0000000000000000000000000000000000000000";
const mockOracleAddress = "0x0000000000000000000000000000000000000000";

const itoPoolAddress = "0x0000000000000000000000000000000000000000";

export default defineConfig({
  contracts: [
    {
      abi: itoRouterAbi as Abi,
      address: itoRouterAddress,
      name: "ItoRouter",
    },
    {
      abi: itoTokenAbi as Abi,
      address: itoTokenAddress,
      name: "ItoToken",
    },
    {
      abi: mockOracle as Abi,
      address: mockOracleAddress,
      name: "MockOracle",
    },
    {
      abi: mockBTCAbi as Abi,
      address: mockBTCAddress,
      name: "MockBTC",
    },
    {
      abi: mockUSDCAbi as Abi,
      address: mockUSDAddress,
      name: "MockUSDC",
    },
    {
      abi: itoPool as Abi,
      address: itoPoolAddress,
      name: "ItoPool",
    },
  ],
  out: "src/__generated__/wagmi.ts",
  plugins: [react()],
});
