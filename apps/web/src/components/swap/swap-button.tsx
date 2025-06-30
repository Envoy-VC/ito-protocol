import { useMemo } from "react";

import { Button } from "@ito-protocol/ui/components/button";
import {
	readContract,
	waitForTransactionReceipt,
	writeContract,
} from "@wagmi/core";
import { parseEther } from "viem";
import { useAccount } from "wagmi";

import {
	itoProxyAddress,
	mockEthConfig,
	sammFacetConfig,
} from "@/__generated__/wagmi";
import { poolId } from "@/lib/data";
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
			const allowance = await readContract(wagmiConfig, {
				...mockEthConfig,
				args: [address, itoProxyAddress],
				functionName: "allowance",
			});
			const approvalNeeded = allowance < sellAmount;
			if (approvalNeeded) {
				const amountToApprove = amount - allowance + 1n;
				setStatus("approving-eth");
				const hash = await writeContract(wagmiConfig, {
					...mockEthConfig,
					args: [itoProxyAddress, amountToApprove],
					functionName: "approve",
				});
				setStatus("waiting-for-eth-confirmation");
				await waitForTransactionReceipt(wagmiConfig, { hash });
			}

			// Execute Swap
			setStatus("sending-request");
			const hash = await writeContract(wagmiConfig, {
				...sammFacetConfig,
				args: [poolId, mockEthConfig.address, amount],
				functionName: "swap",
			});
			setStatus("waiting-for-confirmation");
			await waitForTransactionReceipt(wagmiConfig, { hash });
			setStatus("request-sent");
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
