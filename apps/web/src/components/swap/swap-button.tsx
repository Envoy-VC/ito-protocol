import { useMemo } from "react";

import { Button } from "@ito-protocol/ui/components/button";

import { useSwapStore } from "@/lib/stores";

export const SwapButton = () => {
  const { sellAmount } = useSwapStore();

  const text = useMemo(() => {
    if (sellAmount === 0 || sellAmount === undefined) return "Enter Amount";
    return "Swap";
  }, [sellAmount]);

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
