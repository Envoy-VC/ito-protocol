import { type Chain, citreaTestnet, mainnet } from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { WagmiProvider } from "wagmi";

import { env } from "@/env";

const projectId = env.VITE_REOWN_PROJECT_ID;

const metadata = {
  description: "Ito Protocol",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
  name: "Ito Protocol",
  url: "https://ito-protocol.vercel.app",
};

const networks = [citreaTestnet, mainnet] as [Chain, Chain];

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
});

export const wagmiConfig = wagmiAdapter.wagmiConfig;

createAppKit({
  adapters: [wagmiAdapter],
  defaultNetwork: citreaTestnet,
  features: {
    analytics: false,
  },
  metadata,
  networks,
  projectId,
  themeVariables: {
    "--w3m-accent": "#ed34e2",
  },
});

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>{children}</WagmiProvider>
  );
};
