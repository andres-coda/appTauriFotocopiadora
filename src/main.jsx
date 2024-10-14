import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ProveiderContext } from "./contexto/contexto";
import { ProveiderModalContext } from "./contexto/modalContexto";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProveiderContext>
      <ProveiderModalContext>
        <App />
      </ProveiderModalContext>
    </ProveiderContext>
  </React.StrictMode>,
);
