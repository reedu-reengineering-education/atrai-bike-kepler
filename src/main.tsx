import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import Layout from "./layout";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Layout>
      <App />
    </Layout>
  </Provider>,
);
