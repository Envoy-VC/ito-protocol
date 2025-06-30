import { useMemo } from "react";

import { Button } from "@ito-protocol/ui/components/button";
import { waitForTransactionReceipt, writeContract } from "@wagmi/core";
import { parseEther } from "viem";
import { useAccount } from "wagmi";

import {
  itoProxyAddress,
  liquidityFacetConfig,
  mockEthConfig,
  mockUsdConfig,
} from "@/__generated__/wagmi";
import { poolId } from "@/lib/data";
import { sleep } from "@/lib/helpers";
import { usePoolStore } from "@/lib/stores";
import { wagmiConfig } from "@/providers/web3";

export const DepositButton = () => {
  const {
    ethAmount,
    status,
    setEthAmount,
    setUsdAmount,
    setStatus,
    usdAmount,
  } = usePoolStore();

  const { address } = useAccount();

  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: safe
  const text = useMemo(() => {
    if (ethAmount === 0 || ethAmount === undefined) return "Enter Amount";
    if (status === "depositing") return "Depositing...";
    if (status === "waiting-for-confirmation")
      return "Waiting for confirmation...";
    if (status === "success") return "Success!";
    if (status === "error") return "Error";
    if (status === "approving-eth") return "Approving ETH...";
    if (status === "waiting-for-eth-confirmation")
      return "Waiting for ETH Approval...";
    if (status === "approving-usd") return "Approving USD...";
    if (status === "waiting-for-usd-confirmation")
      return "Waiting for USD Approval...";
    if (status === "idle") return "Deposit";
    return "Deposit";
  }, [ethAmount, status]);

  const variant = useMemo(() => {
    if (text === "Enter Amount") return "secondary";
    if (status === "success") return "duotone-success";
    if (status === "error") return "duotone-destructive";
    return "duotone-primary";
  }, [text, status]);

  const onDeposit = async () => {
    if (ethAmount === undefined) return;
    if (ethAmount <= 0) return;
    if (usdAmount === undefined) return;
    if (usdAmount <= 0) return;
    try {
      if (!address) throw new Error("Please connect your wallet");

      // Step 1 Approve
      setStatus("approving-eth");
      const ethHash = await writeContract(wagmiConfig, {
        ...mockEthConfig,
        args: [itoProxyAddress, parseEther(ethAmount.toString())],
        functionName: "approve",
      });
      setStatus("waiting-for-eth-confirmation");
      await waitForTransactionReceipt(wagmiConfig, { hash: ethHash });
      setStatus("approving-usd");
      const usdHash = await writeContract(wagmiConfig, {
        ...mockUsdConfig,
        args: [itoProxyAddress, parseEther(usdAmount.toString())],
        functionName: "approve",
      });
      setStatus("waiting-for-usd-confirmation");
      await waitForTransactionReceipt(wagmiConfig, { hash: usdHash });

      // Step 2 Deposit
      setStatus("depositing");
      const hash = await writeContract(wagmiConfig, {
        ...liquidityFacetConfig,
        args: [
          poolId,
          parseEther(ethAmount.toString()),
          parseEther(usdAmount.toString()),
        ],
        functionName: "addLiquidity",
      });
      setStatus("waiting-for-confirmation");
      await waitForTransactionReceipt(wagmiConfig, { hash });
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      await sleep(3000);
      setStatus("idle");
      setEthAmount(0);
      setUsdAmount(0);
    }
  };

  return (
    <Button
      animateKey={status}
      className="!w-full h-12"
      disabled={status !== "idle"}
      onClick={onDeposit}
      variant={variant}
    >
      {text}
    </Button>
  );
};
