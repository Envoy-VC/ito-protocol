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

const itoProxyAddress = "0x6E85056eb08D248Ee516bE85818EE5a4ca0b0223";

const itoTokenAddress = "0xe7099daf495c9AaD8DbBc609807cCAfCd66c782e";
const mockETHAddress = "0x2A8F6aC0b8B5f4cCcB1F418A1531F069bB53ae7e";
const mockUSDAddress = "0x6e2bBe609E602bE493fF8580523Bf1eeBa2c7693";

// Deploying contracts with the account: 0x9A36a8EDAF9605F7D4dDC72F4D81463fb6f841d8
//   DiamondCutFacet deployed to: 0x6cb75Ab8807b55dF4cBb7751dED5854575Ea414a
//   OwnershipFacet deployed to: 0x963288C37c071c603Bfa766EEd1B81e2C8825069
//   Proxy deployed to: 0x6E85056eb08D248Ee516bE85818EE5a4ca0b0223
//   Diamond Loupe deployed to: 0x6E85056eb08D248Ee516bE85818EE5a4ca0b0223
//   Treasury deployed to: 0x23F91c8cd97CF971d7d47ccA0b3996BAC7a544B6
//   Liquidity deployed to: 0xcDfb1932B902F7c4558fC67268C29a0a90C269ef
//   Emergency deployed to: 0xf66Cf61f078C2D5aBB98Cb5aa1573f2191B1735C
//   Oracle deployed to: 0x6FAEe8b4010221DB07D75A802b8b228f317e0e88
//   SAMM deployed to: 0xd86A74554B290683cC7eF08b3abA08e50858a135
//   ItoInitializer deployed to: 0xdd54C3FD2A5e21b270E66016BB5bA0451E26EbD6
//   ItoToken deployed to: 0xe7099daf495c9AaD8DbBc609807cCAfCd66c782e
//   Mock USD deployed to: 0x6e2bBe609E602bE493fF8580523Bf1eeBa2c7693
//   Mock ETH deployed to: 0x2A8F6aC0b8B5f4cCcB1F418A1531F069bB53ae7e
//   Mock Volatility deployed to: 0xE03dfC67de98519B42Bf91B452b10B92f1b0A761
//   Pool Id:
//   0x645b28c2c27a32d2

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
