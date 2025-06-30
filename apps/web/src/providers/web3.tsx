import { avalancheFuji, mainnet } from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { WagmiProvider } from "wagmi";

const projectId = import.meta.env.VITE_REOWN_PROJECT_ID;

const metadata = {
	description: "Ito Protocol",
	icons: ["https://avatars.githubusercontent.com/u/179229932"],
	name: "Ito Protocol",
	url: "https://ito-protocol.vercel.app",
};

const networks = [avalancheFuji, mainnet];

const wagmiAdapter = new WagmiAdapter({
	networks,
	projectId,
	ssr: true,
});

export const wagmiConfig = wagmiAdapter.wagmiConfig;

createAppKit({
	adapters: [wagmiAdapter],
	defaultNetwork: avalancheFuji,
	features: {
		analytics: false,
	},
	metadata,
	// @ts-expect-error safe
	networks,
	projectId,
});

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
	return (
		<WagmiProvider config={wagmiAdapter.wagmiConfig}>{children}</WagmiProvider>
	);
};
