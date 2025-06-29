import { DepositButton } from "./deposit-button";
import { TokenContainer } from "./token-container";

export const DepositTokens = () => {
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
