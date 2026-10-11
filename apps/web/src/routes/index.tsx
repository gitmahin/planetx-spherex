import { SkyWatcherPage } from "@/features/sky";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: SkyWatcherPage,
});
