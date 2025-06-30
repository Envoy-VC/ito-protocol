import { createFileRoute } from "@tanstack/react-router";

import { PoolContainer } from "@/components";

export const Route = createFileRoute("/dashboard/pool")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="mx-auto my-24 flex max-w-xl flex-col">
			<div className="px-1 pb-6 text-4xl">New Position</div>
			<PoolContainer />
		</div>
	);
}
