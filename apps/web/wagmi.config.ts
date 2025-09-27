import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import type { Abi } from "viem";

import { ContractAddress } from "@/data";

import { abi as itoPool } from "../../packages/contracts/out/ItoPool.sol/ItoPool.json";
import { abi as itoRouterAbi } from "../../packages/contracts/out/ItoRouter.sol/ItoRouter.json";
// Tokens
import { abi as itoTokenAbi } from "../../packages/contracts/out/ItoToken.sol/ItoToken.json";
import { abi as mockETHAbi } from "../../packages/contracts/out/MockETH.sol/MockETH.json";
import { abi as mockOracle } from "../../packages/contracts/out/MockOracle.sol/MockOracle.json";
import { abi as mockUSDCAbi } from "../../packages/contracts/out/MockUSD.sol/MockUSDC.json";

const itoRouterAddress = ContractAddress.router;

const mockETHAddress = ContractAddress.mockETH;
const mockUSDAddress = ContractAddress.mockUSD;

const itoTokenAddress = ContractAddress.itoToken;
const mockOracleAddress = ContractAddress.oracle;

const itoPoolAddress = ContractAddress.pool;

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
      abi: mockETHAbi as Abi,
      address: mockETHAddress,
      name: "MockETH",
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
