import { Button } from "@ito-protocol/ui/components/button";
import Spline from "@splinetool/react-spline";
import { createFileRoute, Link } from "@tanstack/react-router";
import { RocketIcon } from "lucide-react";

const HomeComponent = () => {
  return (
    <div className="hide-scrollbar max-h-screen overflow-hidden">
      <div className="h-screen scale-[120%]">
        <Spline scene="https://prod.spline.design/uNUXHjukp7GKAj4f/scene.splinecode" />
      </div>
      <div className="absolute top-[45%] right-1/2 translate-x-1/2">
        <Button
          className="!rounded-2xl"
          icon={<RocketIcon />}
          size="lg"
          variant="duotone-primary"
        >
          <Link to="/dashboard">Launch App</Link>
        </Button>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/")({
  component: HomeComponent,
});
