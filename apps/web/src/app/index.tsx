import Spline from "@splinetool/react-spline";
import { createFileRoute } from "@tanstack/react-router";

const HomeComponent = () => {
	return (
		<div className="hide-scrollbar max-h-screen overflow-hidden">
			<div className="h-screen scale-[120%]">
				<Spline scene="https://prod.spline.design/uNUXHjukp7GKAj4f/scene.splinecode" />
			</div>
		</div>
	);
};

export const Route = createFileRoute("/")({
	component: HomeComponent,
});
