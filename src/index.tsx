import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { DBConfig } from "./services/indexedDb";
import { initDB } from "react-indexed-db";
import firebase from "firebase/app";
import { firebaseConfig } from "./services/firebase";

initDB(DBConfig);
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
