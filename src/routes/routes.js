import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import PrivateRoute from "./privateRoute";

import Home from "../pages/Home/Home";
import Account from "../pages/Account/Account";

import Restaurant from "../pages/Restaurant/Resturant";
import Menu from "../pages/Menu/Menu";
import Tables from "../pages/Tables/Tables";
import Report from "../pages/Report/Report";
import LiveOrders from "../pages/Orders/LiveOrders/LiveOrders";
import AllOrders from "../pages/Orders/AllOrders/AllOrders";

const Routes = props => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />

      <PrivateRoute
        exact
        isLogged={props.auth}
        path="/account"
        component={Account}
      />
      <PrivateRoute
        isLogged={props.auth}
        path="/restaurant"
        component={Restaurant}
      />
      <PrivateRoute exact isLogged={props.auth} path="/menu" component={Menu} />

      <PrivateRoute
        exact
        isLogged={props.auth}
        path="/tables"
        component={Tables}
      />

      <PrivateRoute
        exact
        isLogged={props.auth}
        path="/orders/live"
        component={LiveOrders}
      />
      <PrivateRoute
        exact
        isLogged={props.auth}
        path="/orders/all"
        component={AllOrders}
      />
      <PrivateRoute
        exact
        isLogged={props.auth}
        path="/report"
        component={Report}
      />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default Routes;
