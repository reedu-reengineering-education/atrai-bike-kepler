import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import {Router, RouterProvider} from "@tanstack/react-router";
import store from "./lib/redux/store.ts";
import { routeTree } from "./routeTree.ts"
const router = new Router({ routeTree });

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
     <RouterProvider router={router} />
  </Provider>,
);
