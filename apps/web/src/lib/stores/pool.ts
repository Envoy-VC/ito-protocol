import { create } from "zustand";

interface PoolState {
  ethAmount: number | undefined;
  usdAmount: number | undefined;
}

interface PoolStoreActions {
  setEthAmount: (ethAmount: number | undefined) => void;
  setUsdAmount: (usdAmount: number | undefined) => void;
}

export const usePoolStore = create<PoolState & PoolStoreActions>()((set) => ({
  ethAmount: undefined,
  setEthAmount: (ethAmount: number | undefined) => {
    set(() => ({ ethAmount }));
  },
  setUsdAmount: (usdAmount: number | undefined) => {
    set(() => ({ usdAmount }));
  },
  usdAmount: undefined,
}));
