import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { injectStore } from "./api/client.ts";

injectStore(store);
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
