import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { Router, RouterProvider } from "@tanstack/react-router";
import store from "./lib/redux/store.ts";
import { routeTree } from "./routeTree.ts";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { RefreshProvider } from "./context/RefreshContext.tsx";
import { Toaster } from "./components/ui/sonner.tsx";

const router = new Router({ routeTree });

createRoot(document.getElementById("root")!).render(
  <AuthContextProvider>
    <RefreshProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
        <Toaster />
      </Provider>
    </RefreshProvider>
  </AuthContextProvider>,
);
