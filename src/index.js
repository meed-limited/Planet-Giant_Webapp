import React from "react";
import { createRoot } from "react-dom/client";
import { MoralisProvider } from "react-moralis";
import { UserDataProvider } from "./userContext/UserContextProvider";
import App from "./App";
import "./index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const APP_ID = "ytDKAUvHS2OfN9hnjUwrKWAD59DmBNeBS0TdDc1q";
const SERVER_URL = "https://dgsd2tljzqio.usemoralis.com:2053/server";

const Application = () => {
  return (
    <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
      <UserDataProvider>
        <App isServerInfo />
      </UserDataProvider>
    </MoralisProvider>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<Application />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
