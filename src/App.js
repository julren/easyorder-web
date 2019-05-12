import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

import Layout from "./components/layout/layout";
import RestaurantContextWrapper, {
  RestaurantContextConsumer
} from "./contexts/RestaurantContextWrapper";
import { Loader } from "semantic-ui-react";

const App = props => (
  <RestaurantContextWrapper>
    <BrowserRouter>
      <RestaurantContextConsumer>
        {({ loading }) => (
          <React.Fragment>
            {loading ? <Loader /> : <Layout {...props} />}
          </React.Fragment>
        )}
      </RestaurantContextConsumer>
    </BrowserRouter>
  </RestaurantContextWrapper>
);

export default App;
