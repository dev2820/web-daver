import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import App from "./App";
import { workspaceSearchSchema } from "./lib/workspace-search";
import AuthPage from "./pages/auth-page";
import HomePage from "./pages/home-page";
import SettingPage from "./pages/setting-page";
import { useServersStore } from "./stores/servers";

const rootRoute = createRootRoute({ component: App });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({
      to: useServersStore.getState().currentServerUrl ? "/home" : "/auth",
    });
  },
});

const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "auth",
  component: AuthPage,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "home",
  validateSearch: workspaceSearchSchema,
  component: HomePage,
});

const settingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "setting",
  component: SettingPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  authRoute,
  homeRoute,
  settingRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
