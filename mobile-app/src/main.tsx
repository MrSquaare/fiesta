import * as React from "react";
import * as ReactDOM from "react-dom/client";

import { App, AppProviders } from "./App";

import "./main.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
);
