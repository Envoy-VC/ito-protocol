import { create } from "zustand";

type Status =
	| "idle"
	| "approving-eth"
	| "waiting-for-eth-confirmation"
	| "approving-usd"
	| "waiting-for-usd-confirmation"
	| "depositing"
	| "waiting-for-confirmation"
	| "success"
	| "error";

interface PoolState {
	ethAmount: number | undefined;
	usdAmount: number | undefined;
	status: Status;
}

interface PoolStoreActions {
	setEthAmount: (ethAmount: number | undefined) => void;
	setUsdAmount: (usdAmount: number | undefined) => void;
	setStatus: (status: Status) => void;
}

export const usePoolStore = create<PoolState & PoolStoreActions>()((set) => ({
	ethAmount: undefined,
	setEthAmount: (ethAmount: number | undefined) => {
		set(() => ({ ethAmount }));
	},
	setStatus: (status: Status) => {
		set(() => ({ status }));
	},
	setUsdAmount: (usdAmount: number | undefined) => {
		set(() => ({ usdAmount }));
	},
	status: "idle",
	usdAmount: undefined,
}));
