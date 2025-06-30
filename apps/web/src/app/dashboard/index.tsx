import { createFileRoute } from "@tanstack/react-router";

import { SwapContainer } from "@/components";

export const Route = createFileRoute("/dashboard/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="relative top-1/3 mx-auto h-[94dvh] w-full">
			<div className="absolute top-1/5 right-1/2 w-full max-w-md translate-x-1/2">
				<SwapContainer />
			</div>
		</div>
	);
}
