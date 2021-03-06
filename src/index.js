import React from "react";
import ReactDOM from "react-dom";
import ErrorBoundary from "./ErrorBoundary";
import "bootswatch/dist/superhero/bootstrap.min.css";
import { CartProvider } from "./useContext/cartContext";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <CartProvider>
        <App />
      </CartProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);
