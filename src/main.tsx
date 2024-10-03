import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { Provider } from "react-redux";
import { NextLibProvider } from "./provider.tsx";
import { store } from "./store/store.ts";

import "@/styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <NextLibProvider>
          <App />
        </NextLibProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
