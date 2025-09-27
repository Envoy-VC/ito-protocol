import { useMemo, useState } from "react";

import { Input } from "@ito-protocol/ui/components/input";
import { BitcoinIcon, USDCIcon } from "@ito-protocol/ui/icons";
import { cn } from "@ito-protocol/ui/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import { formatEther, zeroAddress } from "viem";
import { useAccount } from "wagmi";

import {
  useReadMockBtcBalanceOf,
  useReadMockOracleGetPrice,
  useReadMockUsdcBalanceOf,
} from "@/__generated__/wagmi";

// import { MintButton } from "./mint-button";

export const FacetContainer = () => {
  const [mintState, setMintState] = useState<
    "idle" | "processing" | "waiting-for-confirmation" | "success" | "error"
  >("idle");
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [currentToken, setCurrentToken] = useState<"btc" | "usd">("btc");

  const { address } = useAccount();

  const { data: mockBtcBalance, refetch: refetchMockBtcBalance } =
    useReadMockBtcBalanceOf({
      args: [address ?? zeroAddress],
    });

  const { data: mockUsdBalance, refetch: refetchMockUsdBalance } =
    useReadMockUsdcBalanceOf({
      args: [address ?? zeroAddress],
    });

  const { data: BtcPriceInUSD } = useReadMockOracleGetPrice({});

  const amountValue = useMemo(() => {
    const a = amount ?? 0;
    const currentPrice = Number(formatEther(BtcPriceInUSD ?? 0n));
    if (currentToken === "btc") return (a * currentPrice).toFixed(4);
    return a;
  }, [currentToken, amount, BtcPriceInUSD]);

  const refetchAll = async () => {
    await refetchMockBtcBalance();
    await refetchMockUsdBalance();
  };

  const balance = useMemo(() => {
    const btc = Number(formatEther(mockBtcBalance ?? 0n)).toFixed(4);
    const usd = Number(formatEther(mockUsdBalance ?? 0n)).toFixed(2);
    if (currentToken === "btc") return btc;
    return usd;
  }, [mockBtcBalance, mockUsdBalance, currentToken]);

  const { Icon, symbol, mockSymbol } = useMemo(() => {
    if (currentToken === "btc") {
      return {
        // biome-ignore lint/style/useNamingConvention: safe
        Icon: BitcoinIcon,
        mockSymbol: "mBTC",
        symbol: "BTC",
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
            disabled={mintState !== "idle"}
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
              setCurrentToken(currentToken === "btc" ? "usd" : "btc");
            }}
            type="button"
          >
            <Icon size={32} />
            <div className="text-xl">{symbol}</div>
            <ChevronsUpDown className="mr-1" size={20} />
          </button>
        </div>
        <div className="flex items-center justify-between gap-2 text-neutral-400 text-sm">
          <div>${amountValue}</div>
          <div>
            {balance} {mockSymbol}
          </div>
        </div>
      </div>
      {/* <MintButton
        amount={amount}
        currentToken={currentToken}
        mintState={mintState}
        refetch={refetchAll}
        setAmount={setAmount}
        setMintState={setMintState}
      /> */}
    </div>
  );
};
