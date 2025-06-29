import { useMemo } from "react";

import { Button } from "@ito-protocol/ui/components/button";

import { usePoolStore } from "@/lib/stores";

export const DepositButton = () => {
  const { ethAmount } = usePoolStore();
  const text = useMemo(() => {
    if (ethAmount === 0 || ethAmount === undefined) return "Enter Amount";
    return "Deposit";
  }, [ethAmount]);

  const variant = useMemo(() => {
    if (text === "Enter Amount") return "secondary";
    return "duotone-primary";
  }, [text]);

  return (
    <Button className="!w-full h-12" variant={variant}>
      {text}
    </Button>
  );
};
