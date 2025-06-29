import { useMemo, useState } from "react";

import { Input } from "@ito-protocol/ui/components/input";
import { EthereumIcon, USDCIcon } from "@ito-protocol/ui/icons";
import { cn } from "@ito-protocol/ui/lib/utils";
import { ChevronsUpDown } from "lucide-react";

import { MintButton } from "./mint-button";

export const FacetContainer = () => {
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [currentToken, setCurrentToken] = useState<"eth" | "usd">("eth");

  const { Icon, symbol, mockSymbol } = useMemo(() => {
    if (currentToken === "eth") {
      return {
        // biome-ignore lint/style/useNamingConvention: safe
        Icon: EthereumIcon,
        mockSymbol: "mETH",
        symbol: "ETH",
      };
    }
    return {
      // biome-ignore lint/style/useNamingConvention: safe
      Icon: USDCIcon,
      mockSymbol: "mUSD",
      symbol: "USD",
    };
  }, [currentToken]);
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <div
        className={cn(
          "flex flex-col gap-2 rounded-3xl border border-border px-5 py-4 transition-all duration-200 ease-in-out",
        )}
      >
        <div className="flex flex-row items-center justify-between">
          <div className="text-lg text-neutral-400">Mint Tokens</div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Input
            className="!text-5xl [&::-moz-appearance]:textfield rounded-none border-none px-0 shadow-none outline-none [&::-webkit-outer-spin-button] focus-visible:border-0 focus-visible:ring-0 [&::-webkit-inner-spin-button]:appearance-none"
            onChange={(e) => {
              let amount: number | undefined;
              if (e.target.value === "") amount = undefined;
              else amount = Number(e.target.value);

              setAmount(amount);
            }}
            placeholder="0"
            type="number"
            value={amount}
          />
          <button
            className="flex cursor-pointer flex-row items-center gap-1 rounded-3xl border-[1.5px] px-1 py-[3px] shadow-[rgba(255,255,255,0.04)_0px_0px_10px]"
            onClick={() => {
              setCurrentToken(currentToken === "eth" ? "usd" : "eth");
            }}
            type="button"
          >
            <Icon size={32} />
            <div className="text-xl">{symbol}</div>
            <ChevronsUpDown className="mr-1" size={20} />
          </button>
        </div>
        <div className="flex items-center justify-between gap-2 text-neutral-400 text-sm">
          <div>$0</div>
          <div>0.00 {mockSymbol}</div>
        </div>
      </div>
      <MintButton amount={amount} setAmount={setAmount} />
    </div>
  );
};
