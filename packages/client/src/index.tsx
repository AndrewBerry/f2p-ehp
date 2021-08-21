import React from "react";
import ReactDOM from "react-dom";

import { Player } from "@f2p/common";

import reportWebVitals from "./reportWebVitals";

import "./index.css";

const me: Player = {
  ign: "so so much"
};

ReactDOM.render(
  <React.StrictMode>{me.ign}</React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
