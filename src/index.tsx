// import React from "react";
import { createRoot } from "react-dom/client";
import { MoralisProvider } from "react-moralis";
import { UserDataProvider } from "./userContext/UserContextProvider";
import App from "./App";
import "./index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;

const Application = () => {
  if (APP_ID && SERVER_URL) {
    return (
      // <React.StrictMode>
      <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
        <UserDataProvider>
          <App />
        </UserDataProvider>
      </MoralisProvider>
      // </React.StrictMode>
    );
  } else {
    throw new Error("Missing Moralis Application ID or Server URL. Make sure to set your .env file.");
  }
};

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(<Application />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
