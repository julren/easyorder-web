import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import PrivateRoute from "./privateRoute";

import Home from "../components/Home/home";
import Account from "../components/Account/account";

import Restaurant from "../components/Restaurant/";
import Menu from "../components/Menu";
import Report from "../components/Report/report";
import Orders from "../components/Orders/orders";
import Order from "../components/Order/order";

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
        path="/orders"
        component={Orders}
      />
      <PrivateRoute
        exact
        isLogged={props.auth}
        path="/order"
        component={Order}
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
