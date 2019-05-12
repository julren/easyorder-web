import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { firebase } from "./config/firebase";
import Public from "./pages/public/Public";

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log("logged in!", user.email);
    ReactDOM.render(<App auth={user} />, document.getElementById("root"));
  } else {
    console.log("logged out");
    ReactDOM.render(<Public />, document.getElementById("root"));
  }
});
