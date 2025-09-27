import type { PropsWithChildren } from "react";

import { QueryProvider } from "./query";
import { Web3Provider } from "./web3";

export const ProviderTree = ({ children }: PropsWithChildren) => {
  return (
    <QueryProvider>
      <Web3Provider>{children}</Web3Provider>
    </QueryProvider>
  );
};
