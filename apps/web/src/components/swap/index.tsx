import { useEffect } from "react";

import { formatEther } from "viem";

import {
  useReadLiquidityFacetGetPoolState,
  useReadOracleFacetGetLatestPrice,
  useReadOracleFacetGetLatestVolatility,
} from "@/__generated__/wagmi";
import { poolId } from "@/lib/data";
import { calculateEffectivePrice } from "@/lib/helpers";
import { useSwapStore } from "@/lib/stores";

import { SwapButton } from "./swap-button";
import { TokenContainer } from "./token-container";

export const SwapContainer = () => {
  const {
    sellToken,
    setSellAmount,
    setBuyAmount,
    sellAmount,
    setPercentageDifference,
  } = useSwapStore();

  const { data: vol } = useReadOracleFacetGetLatestVolatility({
    args: [poolId],
  });

  const { data: price } = useReadOracleFacetGetLatestPrice({
    args: [poolId],
  });

  const { data: poolState } = useReadLiquidityFacetGetPoolState({
    args: [poolId],
  });

  useEffect(() => {
    const sellAmt = Number(sellAmount ?? 0);
    if (sellAmt === 0) {
      setPercentageDifference(null);
      setBuyAmount(0);
      return;
    }
    const lastUpdateInSeconds = Number(poolState?.lastUpdate ?? 0n);
    const deltaTSeconds = Math.floor(Date.now() / 1000) - lastUpdateInSeconds;
    const deltaT = deltaTSeconds / 31536000;

    const volatility = Number(formatEther(vol ?? 0n));
    const marketPrice = Number(formatEther(price ?? 0n));

    const { averageEffectivePrice, percentageDifference } =
      calculateEffectivePrice(volatility, deltaT, marketPrice);
    setPercentageDifference(percentageDifference);
    if (sellToken === "eth") {
      const x = averageEffectivePrice * sellAmt;
      setBuyAmount(Number(x.toFixed(4)));
    } else {
      const x = sellAmt / averageEffectivePrice;
      setSellAmount(Number(x.toFixed(4)));
    }
  }, [
    poolState,
    sellAmount,
    sellToken,
    vol,
    price,
    setBuyAmount,
    setSellAmount,
    setPercentageDifference,
  ]);

  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <div className="relative flex w-full max-w-md flex-col gap-2">
        {sellToken === "eth" ? (
          <>
            <TokenContainer
              icon="eth"
              mockSymbol="mETH"
              symbol="ETH"
              title="Sell"
            />
            <TokenContainer
              icon="usd"
              mockSymbol="mUSD"
              symbol="USD"
              title="Buy"
            />
          </>
        ) : (
          <>
            <TokenContainer
              icon="usd"
              mockSymbol="mUSD"
              symbol="USD"
              title="Sell"
            />
            <TokenContainer
              icon="eth"
              mockSymbol="mETH"
              symbol="ETH"
              title="Buy"
            />
          </>
        )}

        {/* <button
          className="-translate-y-1/2 absolute top-1/2 right-1/2 flex size-12 translate-x-1/2 cursor-pointer items-center justify-center rounded-xl border-4 border-background bg-[#242424]"
          onClick={() => {
            setSellToken(sellToken === "eth" ? "usd" : "eth");
            setSellAmount(0);
            setBuyAmount(0);
          }}
          type="button"
        >
          <ArrowDownIcon size={28} />
        </button> */}
      </div>
      <SwapButton />
    </div>
  );
};
