import React from "react";
import { Route, Redirect } from "react-router-dom";

// checks if user is logged. If yes, return Route with passed Component
// if not, return Redirect to login
const PrivateRoute = ({ isLogged, component: Comp, ...rest }) => {
  return (
    <Route
      {...rest}
      component={props => {
        return isLogged ? <Comp {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
};
export default PrivateRoute;
