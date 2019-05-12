import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

import Home from "../pages/home/Home";
import Account from "../pages/account/Account";

import Restaurant from "../pages/restaurant/Resturant";
import Menu from "../pages/menu/Menu";
import Tables from "../pages/tables/Tables";
import Report from "../pages/report/Report";
import LiveOrders from "../pages/orders/liveOrders/LiveOrders";
import AllOrders from "../pages/orders/allOrders/AllOrders";

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
