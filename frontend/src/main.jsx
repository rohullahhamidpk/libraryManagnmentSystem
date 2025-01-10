import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import axios from "axios";
axios.defaults.withCredentials = true;

export const backend_server = `https://library-managnment-system-8p9p.vercel.app/`;

ReactDOM.createRoot(document.getElementById("root")).render(<App></App>);
// <React.StrictMode>
// </React.StrictMode>
