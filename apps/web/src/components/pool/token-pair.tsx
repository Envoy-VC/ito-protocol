import { useMemo } from "react";

import { EthereumIcon, USDCIcon } from "@ito-protocol/ui/icons";
import { formatEther } from "viem";

import { useReadOracleFacetGetLatestPrice } from "@/__generated__/wagmi";
import { poolId } from "@/lib/data";

export const TokenPairDetails = () => {
	const { data: price } = useReadOracleFacetGetLatestPrice({
		args: [poolId],
	});

	const data = useMemo(() => {
		const formatted = Number(formatEther(price ?? 0n));
		return Number(formatted.toFixed(2)).toLocaleString();
	}, [price]);
	return (
		<div className="flex w-full max-w-xl flex-col gap-2 rounded-3xl border px-6 py-6">
			<div className="flex flex-row items-center gap-2">
				<div className="flex flex-row items-center gap-[2px]">
					<div className="h-8 w-4 overflow-hidden">
						<EthereumIcon className="size-8" />
					</div>
					<div className="h-8 w-4 rotate-180 overflow-hidden">
						<USDCIcon className="size-8" />
					</div>
				</div>
				<div className="text-xl">ETH / USD</div>
			</div>
			<div className="flex flex-row gap-2 text-sm">
				<div className="text-neutral-400">Market Price:</div>
				<div>{data} USD₮0 = 1 ETH</div>
				<div className="text-neutral-400">(${data})</div>
			</div>
		</div>
	);
};
