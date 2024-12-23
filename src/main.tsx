import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.tsx";

import store from "./Redux/store.tsx";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <Auth0Provider
    domain="dev-izbze3jzutnbosaz.us.auth0.com"
    clientId="Zl8uopiOqJyHvFnVHHmNnnHag8P74lmN"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </Auth0Provider>
);
