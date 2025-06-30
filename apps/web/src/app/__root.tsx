import { Toaster } from "@ito-protocol/ui/components/sonner";
import { createRootRoute, Outlet } from "@tanstack/react-router";

import { ProviderTree } from "@/providers";

import "@ito-protocol/ui/globals.css";

const RootComponent = () => {
  return (
    <ProviderTree>
      <Outlet />
      <Toaster />
    </ProviderTree>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
