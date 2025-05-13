// routeTree.ts
import { createRootRoute, createRoute } from "@tanstack/react-router";
import Layout from "./layout";
import Home from "./components/home/Home";
import Genesis from "./components/models/genesis/Genesis";
import Explorer from "./components/models/explorer/Explorer";
import Quantum from "./components/models/quantum/Quantum";

const rootRoute = createRootRoute({
  component: Layout, 
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home ,
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

export const routeTree = rootRoute.addChildren([indexRoute, genesisRoute, explorerRoute, quantumRoute]);