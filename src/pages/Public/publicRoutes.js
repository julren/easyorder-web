import React from "react";
import { Route } from "react-router-dom";

import Landing from "./Landing/landing";
import Login from "./Login/login";
import Signup from "./Signup/signup";

const Routes = props => {
  return (
    <React.Fragment>
      <Route exact path="/" component={Landing} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
    </React.Fragment>
  );
};

export default Routes;
