import React from "react";
import { Route } from "react-router-dom";

import Landing from "./landing/landing";
import Login from "./login/Login";
import Signup from "./signup/Signup";

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
