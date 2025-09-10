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
import MapPage from "@/components/pages/MapPage";
import DocumentationIntroductionPage from "@/components/pages/Documentations/Introduction";
import NotFound from "./components/pages/NotFound";
import Forgetpassword from "@/components/pages/ForgetPassword";
import ResetPassword from "@/components/pages/ResetPassword";
import CustomFeatures from "./components/pages/Documentations/CustomFeatures";
import GetStarted from "./components/pages/Documentations/GetStarted";
import BuiltInDatasets from "./components/pages/Documentations/BuiltInDatasets";

const rootRoute = createRootRoute({
  component: Layout,
  notFoundComponent: NotFound,
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
const introductionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/docs/introduction",
  component: DocumentationIntroductionPage,
});
const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signup",
  component: SignUpPage,
});
const ForgetPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/forget-password",
  component: Forgetpassword,
});
const ResetPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reset-password",
  component: ResetPassword,
});
export const mapDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/maps/$mapId",
  component: MapPage,
});

export const customFeatures = createRoute({
  getParentRoute: () => rootRoute,
  path: "/docs/custom-features",
  component: CustomFeatures,
});
export const builtInDatasets = createRoute({
  getParentRoute: () => rootRoute,
  path: "/docs/built-in-datasets",
  component: BuiltInDatasets,
});

export const getStarted = createRoute({
  getParentRoute: () => rootRoute,
  path: "docs/get-started",
  component: GetStarted,
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  statisticsRoute,
  genesisRoute,
  explorerRoute,
  quantumRoute,
  signinRoute,
  signupRoute,
  mapDetailRoute,
  introductionRoute,
  ForgetPasswordRoute,
  ResetPasswordRoute,
  customFeatures,
  getStarted,
  builtInDatasets,
]);
