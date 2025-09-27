import { useMemo } from "react";

import { Button } from "@ito-protocol/ui/components/button";
import { waitForTransactionReceipt, writeContract } from "@wagmi/core";
import { parseEther } from "viem";
import { hexToBigInt, keccak256, parseEventLogs } from "viem/utils";
import { useAccount } from "wagmi";

import {
  itoPoolAbi,
  itoPoolAddress,
  itoPoolConfig,
  mockEthConfig,
} from "@/__generated__/wagmi";
import { sleep } from "@/lib/helpers";
import { useSwapStore } from "@/lib/stores";
import { wagmiConfig } from "@/providers/web3";

export const SwapButton = () => {
  const { address } = useAccount();
  const { status, sellAmount, setStatus, setBuyAmount, setSellAmount } =
    useSwapStore();

  const onSwap = async () => {
    if (sellAmount === undefined) return;
    if (sellAmount <= 0) return;
    try {
      if (!address) throw new Error("Please connect your wallet");
      const amount = parseEther(sellAmount.toString());

      setStatus("processing");

      // Check if approval is needed

      setStatus("approving-eth");
      const hash1 = await writeContract(wagmiConfig, {
        ...mockEthConfig,
        args: [itoPoolAddress, amount],
        functionName: "approve",
      });
      setStatus("waiting-for-eth-confirmation");
      await waitForTransactionReceipt(wagmiConfig, { hash: hash1 });

      // Execute Swap
      setStatus("sending-request");
      const hash = await writeContract(wagmiConfig, {
        ...itoPoolConfig,
        args: [mockEthConfig.address, amount],
        functionName: "swap",
      });
      setStatus("waiting-for-confirmation");
      const receipt = await waitForTransactionReceipt(wagmiConfig, {
        confirmations: 5,
        hash,
      });
      const logs = parseEventLogs({
        abi: itoPoolAbi,
        logs: receipt.logs,
      });
      console.log(logs);
      const requestId = logs.find((l) => l.eventName === "SwapInitiated")?.args
        .requestId;
      if (!requestId) {
        throw new Error("Request Id not found");
      }
      setStatus("request-sent");

      const random = hexToBigInt(keccak256(Buffer.from(crypto.randomUUID())));

      setStatus("processing");
      const hash2 = await writeContract(wagmiConfig, {
        ...itoPoolConfig,
        args: [requestId, [random]],
        functionName: "fulfillSwap",
      });
      await waitForTransactionReceipt(wagmiConfig, { hash: hash2 });
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      await sleep(3000);
      setStatus("idle");
      setSellAmount(undefined);
      setBuyAmount(undefined);
    }
  };

  const text = useMemo(() => {
    if (sellAmount === 0 || sellAmount === undefined) return "Enter Amount";
    if (status === "processing") return "Processing...";
    if (status === "approving-eth") return "Approving ETH...";
    if (status === "waiting-for-eth-confirmation")
      return "Waiting for ETH Approval...";
    if (status === "sending-request") return "Sending Request...";
    if (status === "waiting-for-confirmation")
      return "Waiting for Confirmation...";
    if (status === "request-sent") return "Request Sent!";
    if (status === "error") return "Error";
    return "Swap";
  }, [sellAmount, status]);

  const variant = useMemo(() => {
    if (text === "Enter Amount") return "secondary";
    if (status === "request-sent") return "duotone-success";
    if (status === "error") return "duotone-destructive";
    return "duotone-primary";
  }, [text, status]);

  return (
    <Button
      animateKey={status}
      className="h-12 w-full max-w-md"
      disabled={status !== "idle"}
      onClick={onSwap}
      variant={variant}
    >
      {text}
    </Button>
  );
};
