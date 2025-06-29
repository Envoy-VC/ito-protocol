import { useMemo } from "react";

import { Button } from "@ito-protocol/ui/components/button";
import { waitForTransactionReceipt, writeContract } from "@wagmi/core";
import { parseEther } from "viem";
import { useAccount } from "wagmi";

import { mockEthConfig, mockUsdConfig } from "@/__generated__/wagmi";
import { sleep } from "@/lib/helpers";
import { wagmiConfig } from "@/providers/web3";

interface MintButtonProps {
  amount: number | undefined;
  setAmount: (amount: number | undefined) => void;
  currentToken: "eth" | "usd";
  refetch: () => Promise<void>;
  mintState:
    | "idle"
    | "processing"
    | "waiting-for-confirmation"
    | "success"
    | "error";
  setMintState: (
    mintState:
      | "idle"
      | "processing"
      | "waiting-for-confirmation"
      | "success"
      | "error",
  ) => void;
}

export const MintButton = ({
  amount,
  setAmount,
  refetch,
  currentToken,
  mintState,
  setMintState,
}: MintButtonProps) => {
  const text = useMemo(() => {
    if (amount === 0 || amount === undefined) return "Enter Amount";
    if (mintState === "processing") return "Processing...";
    if (mintState === "waiting-for-confirmation")
      return "Waiting for confirmation...";
    if (mintState === "success") return "Success!";
    if (mintState === "error") return "Error";
    return "Mint Tokens";
  }, [amount, mintState]);

  const { address } = useAccount();

  const onMint = async () => {
    const config = currentToken === "eth" ? mockEthConfig : mockUsdConfig;
    if (amount === undefined) return;
    if (amount <= 0) return;
    try {
      if (!address) throw new Error("Please connect your wallet");
      const parsedAmount = parseEther(amount.toString());
      setMintState("processing");
      const hash = await writeContract(wagmiConfig, {
        ...config,
        args: [address, parsedAmount],
        functionName: "mint",
      });
      setMintState("waiting-for-confirmation");
      await waitForTransactionReceipt(wagmiConfig, { hash });
      setMintState("success");
    } catch (error) {
      console.error(error);
      setMintState("error");
    } finally {
      await sleep(3000);
      setMintState("idle");
      setAmount(0);
      await refetch();
    }
  };

  const variant = useMemo(() => {
    if (text === "Enter Amount") return "secondary";
    if (mintState === "processing") return "duotone-primary";
    if (mintState === "waiting-for-confirmation") return "duotone-primary";
    if (mintState === "success") return "duotone-success";
    if (mintState === "error") return "duotone-destructive";
    return "duotone-primary";
  }, [text, mintState]);

  return (
    <Button
      className="h-12 w-full max-w-md"
      disabled={mintState !== "idle"}
      onClick={onMint}
      variant={variant}
    >
      {text}
    </Button>
  );
};
