import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

import Layout from "./components/Layout/layout";
import RestaurantContextWrapper from "./contexts/RestaurantContextWrapper";

const App = props => (
  <RestaurantContextWrapper>
    <BrowserRouter>
      <Layout {...props} />
    </BrowserRouter>
  </RestaurantContextWrapper>
);

export default App;
