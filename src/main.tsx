import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { injectStore } from "./api/client.ts";
import AuthModal from "./components/AuthModal.tsx";

injectStore(store);
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AuthModal />
    <App />
  </Provider>
);
