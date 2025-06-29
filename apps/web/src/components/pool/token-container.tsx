import { useState } from "react";

import { Input } from "@ito-protocol/ui/components/input";
import { EthereumIcon, USDCIcon } from "@ito-protocol/ui/icons";
import { cn } from "@ito-protocol/ui/lib/utils";
import { motion, type Variants } from "motion/react";

import { usePoolStore } from "@/lib/stores";

const buttons = [
  {
    key: "25-percent",
    name: "25%",
    value: 0.25,
  },
  {
    key: "50-percent",
    name: "50%",
    value: 0.5,
  },
  {
    key: "75-percent",
    name: "75%",
    value: 0.75,
  },
  {
    key: "100-percent",
    name: "Max",
    value: 1,
  },
];

const containerVariants = {
  hover: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const buttonVariants: Variants = {
  hover: {
    opacity: 1,
    transition: { damping: 20, stiffness: 300, type: "spring" },
    x: 0,
  },
  initial: {
    opacity: 0,
    x: 0,
  },
};

interface TokenContainerProps {
  icon: "eth" | "usd";
  symbol: "ETH" | "USD";
  mockSymbol: "mETH" | "mUSD";
}

export const TokenContainer = ({
  icon,
  symbol,
  mockSymbol,
}: TokenContainerProps) => {
  const { ethAmount, usdAmount, setEthAmount, setUsdAmount } = usePoolStore();
  const Icon = icon === "eth" ? EthereumIcon : USDCIcon;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      animate={isHovered ? "hover" : ""}
      className={cn(
        "flex flex-col gap-2 rounded-3xl border bg-[#242424] px-4 pt-8 pb-3 transition-all duration-200 ease-in-out hover:bg-[#242424]/80",
        isHovered ? "border-border" : "border-border/80",
      )}
      initial="initial"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variants={containerVariants}
    >
      <div className="flex flex-row items-center justify-between">
        <Input
          className="!text-4xl [&::-moz-appearance]:textfield rounded-none border-none px-0 shadow-none outline-none [&::-webkit-outer-spin-button] focus-visible:border-0 focus-visible:ring-0 [&::-webkit-inner-spin-button]:appearance-none"
          onChange={(e) => {
            let amount: number | undefined;
            if (e.target.value === "") amount = undefined;
            else amount = Number(e.target.value);

            if (icon === "eth") setEthAmount(amount);
            else setUsdAmount(amount);
          }}
          placeholder="0"
          type="number"
          value={icon === "eth" ? ethAmount : usdAmount}
        />
        <div className="flex flex-row items-center gap-1 rounded-3xl border-[1.5px] border-neutral-700 px-1 py-[3px] shadow-[rgba(255,255,255,0.04)_0px_0px_10px]">
          <Icon size={32} />
          <div className="pr-2 text-xl">{symbol}</div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 text-neutral-400 text-sm">
        <div className="flex flex-row items-center justify-end gap-1">
          {buttons.map((button) => {
            return (
              <motion.button
                className="cursor-pointer rounded-lg border border-neutral-600 bg-white/5 px-[6px] py-[2px] font-medium text-xs transition-all hover:scale-[103%]"
                key={button.key}
                type="button"
                variants={buttonVariants}
              >
                {button.name}
              </motion.button>
            );
          })}
        </div>
        <div>0.00 {mockSymbol}</div>
      </div>
    </motion.div>
  );
};
