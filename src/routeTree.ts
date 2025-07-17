// routeTree.ts
import { createRootRoute, createRoute } from "@tanstack/react-router";
import Layout from "./layout";
import Home from "./components/pages/Home";
import Genesis from "./components/models/genesis/Genesis";
import Explorer from "./components/models/explorer/Explorer";
import Quantum from "./components/models/quantum/Quantum";
import StatisticsPage from "./components/pages/Statistics";
import Signin from "./components/pages/Signin";
import SignUpPage from "./components/pages/SignUp";

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const statisticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/statistics",
  component: StatisticsPage,
});

const genesisRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/genesis",
  component: Genesis,
});

const explorerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/explorer",
  component: Explorer,
});

const quantumRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/quantum",
  component: Quantum,
});

const signinRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signin",
  component: Signin,
});
const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signup",
  component: SignUpPage,
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  statisticsRoute,
  genesisRoute,
  explorerRoute,
  quantumRoute,
  signinRoute,
  signupRoute,
]);
