import { ArrowDownIcon } from "lucide-react";

import { useSwapStore } from "@/lib/stores";

import { SwapButton } from "./swap-button";
import { TokenContainer } from "./token-container";

export const SwapContainer = () => {
  const { sellToken, setSellToken } = useSwapStore();
  return (
    <div className="flex flex-col gap-2">
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

        <button
          className="-translate-y-1/2 absolute top-1/2 right-1/2 flex size-12 translate-x-1/2 cursor-pointer items-center justify-center rounded-xl border-4 border-background bg-[#242424]"
          onClick={() => {
            setSellToken(sellToken === "eth" ? "usd" : "eth");
          }}
          type="button"
        >
          <ArrowDownIcon size={28} />
        </button>
      </div>
      <SwapButton />
    </div>
  );
};
