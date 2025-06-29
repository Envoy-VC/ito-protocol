import { DepositTokens } from "./deposit-tokens";
import { TokenPairDetails } from "./token-pair";

export const PoolContainer = () => {
  return (
    <div className="flex w-full flex-col gap-2">
      <TokenPairDetails />
      <DepositTokens />
    </div>
  );
};
