import React from "react";
import ReactDOM from "react-dom/client";
import "./GlobalStyle.css";
import App from "./App";
import SuperUser from "./components/superuser";
import Profile from "./components/profile";
import { AiOutlineProfile } from "react-icons/ai";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
