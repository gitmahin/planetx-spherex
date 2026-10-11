import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

import appCss from "@repo/ui/globals.css?url";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
import { injectRuntimeEnv } from "@/ssr";
export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "PlanetX SphereX",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  notFoundComponent: () => (
    <main className="container mx-auto p-4 pt-16">
      <h1>404</h1>
      <p>The requested page could not be found.</p>
    </main>
  ),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark`}>
      <head>
        <HeadContent />
        {injectRuntimeEnv()}
      </head>
      <body className="dark overflow-x-hidden">
        <QueryClientProvider client={queryClient}>
          <Toaster richColors={true} position="top-center" />
          <SkeletonTheme baseColor="#27272a" highlightColor="#3f3f46">
            {children}
          </SkeletonTheme>
        </QueryClientProvider>
        <Scripts />
      </body>
    </html>
  );
}
