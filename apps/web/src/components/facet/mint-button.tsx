import { useMemo } from "react";

import { Button } from "@ito-protocol/ui/components/button";

import {
  useReadLiquidityFacetGetPoolConfig,
  useReadLiquidityFacetGetPoolState,
} from "@/__generated__/wagmi";

interface MintButtonProps {
  amount: number | undefined;
  setAmount: (amount: number | undefined) => void;
}

export const MintButton = ({ amount, setAmount }: MintButtonProps) => {
  const text = useMemo(() => {
    if (amount === 0 || amount === undefined) return "Enter Amount";
    return "Mint Tokens";
  }, [amount]);

  const { data } = useReadLiquidityFacetGetPoolState();

  const variant = useMemo(() => {
    if (text === "Enter Amount") return "secondary";
    return "duotone-primary";
  }, [text]);

  return (
    <Button className="h-12 w-full max-w-md" variant={variant}>
      {text}
    </Button>
  );
};
