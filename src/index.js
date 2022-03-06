import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { PainterProvider } from "./context/PainterContext";

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <PainterProvider>
        <App />
      </PainterProvider>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
