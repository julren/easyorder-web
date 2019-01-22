import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

import Layout from "./components/Layout/layout";
const App = props => {
  return (
    <BrowserRouter>
      <Layout {...props} />
    </BrowserRouter>
  );
};

export default App;
