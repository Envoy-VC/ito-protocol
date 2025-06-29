import { create } from "zustand";

interface SwapState {
  activeContainer: "eth" | "usd";
  sellToken: "eth" | "usd";
  sellAmount: number | undefined;
  sellAmountUSD: number;
  buyAmount: number | undefined;
  buyAmountUSD: number;
}

interface SwapStoreActions {
  setActiveContainer: (activeContainer: "eth" | "usd") => void;
  setSellToken: (sellToken: "eth" | "usd") => void;
  setSellAmount: (sellAmount: number | undefined) => void;
  setSellAmountUSD: (sellAmountUSD: number) => void;
  setBuyAmount: (buyAmount: number | undefined) => void;
  setBuyAmountUSD: (buyAmountUSD: number) => void;
}

export const useSwapStore = create<SwapState & SwapStoreActions>()((set) => ({
  activeContainer: "usd",
  buyAmount: 0,
  buyAmountUSD: 0,
  sellAmount: 0,
  sellAmountUSD: 0,
  sellToken: "eth",
  setActiveContainer: (activeContainer: "eth" | "usd") => {
    set(() => ({ activeContainer }));
  },
  setBuyAmount: (buyAmount: number | undefined) => {
    set(() => ({ buyAmount }));
  },
  setBuyAmountUSD: (buyAmountUSD: number) => {
    set(() => ({ buyAmountUSD }));
  },
  setSellAmount: (sellAmount: number | undefined) => {
    set(() => ({ sellAmount }));
  },
  setSellAmountUSD: (sellAmountUSD: number) => {
    set(() => ({ sellAmountUSD }));
  },
  setSellToken: (sellToken: "eth" | "usd") => {
    set(() => ({ sellToken }));
  },
}));
