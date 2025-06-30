import { create } from "zustand";

type Status =
	| "idle"
	| "processing"
	| "approving-eth"
	| "waiting-for-eth-confirmation"
	| "sending-request"
	| "waiting-for-confirmation"
	| "request-sent"
	| "error";

interface SwapState {
	activeContainer: "eth" | "usd";
	sellToken: "eth" | "usd";
	status: Status;
	sellAmount: number | undefined;
	buyAmount: number | undefined;
	percentageDifference: number | null;
}

interface SwapStoreActions {
	setActiveContainer: (activeContainer: "eth" | "usd") => void;
	setSellToken: (sellToken: "eth" | "usd") => void;
	setSellAmount: (sellAmount: number | undefined) => void;
	setBuyAmount: (buyAmount: number | undefined) => void;
	setStatus: (status: Status) => void;
	setPercentageDifference: (percentageDifference: number | null) => void;
}

export const useSwapStore = create<SwapState & SwapStoreActions>()((set) => ({
	activeContainer: "usd",
	buyAmount: undefined,
	percentageDifference: null,
	sellAmount: undefined,
	sellToken: "eth",
	setActiveContainer: (activeContainer: "eth" | "usd") => {
		set(() => ({ activeContainer }));
	},
	setBuyAmount: (buyAmount: number | undefined) => {
		set(() => ({ buyAmount }));
	},
	setPercentageDifference: (percentageDifference: number | null) => {
		set(() => ({ percentageDifference }));
	},
	setSellAmount: (sellAmount: number | undefined) => {
		set(() => ({ sellAmount }));
	},
	setSellToken: (sellToken: "eth" | "usd") => {
		set(() => ({ sellToken }));
	},
	setStatus: (status: Status) => {
		set(() => ({ status }));
	},
	status: "idle",
}));
