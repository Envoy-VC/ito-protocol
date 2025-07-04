import { createRoot } from "react-dom/client";

import { createRouter, RouterProvider } from "@tanstack/react-router";

import { routeTree } from "./route-tree.gen";

// Set up a Router instance
const router = createRouter({
	routeTree,
});

// Register things for type-safety

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

// biome-ignore lint/style/noNonNullAssertion: safe assertion
const rootElement = document.getElementById("app")!;

if (!rootElement.innerHTML) {
	const root = createRoot(rootElement);
	root.render(<RouterProvider router={router} />);
}
