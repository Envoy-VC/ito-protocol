import { useEffect } from "react";

import { formatEther } from "viem";

import {
	useReadLiquidityFacetGetPoolState,
	useReadOracleFacetGetLatestPrice,
	useReadOracleFacetGetLatestVolatility,
} from "@/__generated__/wagmi";
import { poolId } from "@/lib/data";
import { calculateTargetRatio } from "@/lib/helpers";
import { usePoolStore } from "@/lib/stores";

import { DepositButton } from "./deposit-button";
import { TokenContainer } from "./token-container";

export const DepositTokens = () => {
	const { ethAmount, setUsdAmount } = usePoolStore();

	const { data: poolState } = useReadLiquidityFacetGetPoolState({
		args: [poolId],
	});
	const { data: vol } = useReadOracleFacetGetLatestVolatility({
		args: [poolId],
	});
	const { data: price } = useReadOracleFacetGetLatestPrice({
		args: [poolId],
	});

	useEffect(() => {
		const reserveA = Number(formatEther(poolState?.reserveA ?? 0n));
		const reserveB = Number(formatEther(poolState?.reserveB ?? 0n));
		const volatility = Number(formatEther(vol ?? 0n));
		const oraclePrice = Number(formatEther(price ?? 0n));

		const targetRatio = calculateTargetRatio(
			reserveA,
			reserveB,
			volatility,
			oraclePrice,
		);
		const usdAmount = (ethAmount ?? 0) / targetRatio;
		setUsdAmount(usdAmount);
	}, [ethAmount, poolState, vol, price, setUsdAmount]);

	return (
		<div className="flex w-full max-w-xl flex-col gap-4 rounded-3xl border px-6 py-5">
			<div className="flex flex-col gap-1">
				<div className="text-xl">Deposit Tokens</div>
				<div className="text-neutral-400 text-sm">
					Specify the token amounts for your liquidity contribution.
				</div>
			</div>
			<div className="mx-auto flex flex-col gap-1 py-6">
				<TokenContainer icon="eth" mockSymbol="mETH" symbol="ETH" />
				<TokenContainer icon="usd" mockSymbol="mUSD" symbol="USD" />
				<div className="w-full py-3">
					<DepositButton />
				</div>
			</div>
		</div>
	);
};
