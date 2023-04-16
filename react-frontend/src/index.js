import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";

const root= ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
