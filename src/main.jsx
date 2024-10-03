import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ProveiderContext } from "./contexto/contexto";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProveiderContext>
      <App />
    </ProveiderContext>
  </React.StrictMode>,
);
