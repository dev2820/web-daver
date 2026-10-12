"use dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createHashHistory, RouterProvider } from "@tanstack/react-router";
import "./index.css";
import { createAppRouter } from "./router";
import { connectWorkspaceUrl } from "./stores/workspace";

const queryClient = new QueryClient();
const router = createAppRouter(createHashHistory());
connectWorkspaceUrl(router);

export default function EmbeddedApp(_props: {
  dom?: {
    useExpoDOMWebView?: boolean;
    domStorageEnabled?: boolean;
    style?: { flex: number };
  };
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
