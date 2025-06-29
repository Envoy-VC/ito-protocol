import path from "node:path";

import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	envPrefix: ["VITE_"],
	plugins: [
		tanstackRouter({
			autoCodeSplitting: true,
			target: "react",
		}),
		react(),
		tailwindcss(),
	],
	publicDir: "public",
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			public: path.resolve(__dirname, "./public"),
		},
	},
	server: { port: 3000 },
});
