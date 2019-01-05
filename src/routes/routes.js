import React from "react";
import { Route, Redirect } from "react-router-dom";

import PrivateRoute from "./privateRoute";

import Home from "../components/Home/home";
import Account from "../components/Account/account";
import Signup from "../components/Signup/signup";
import Login from "../components/Login/login";
import Restaurant from "../components/Restaurant/restaurant";
import Menu from "../components/Menu/menu";
import Report from "../components/Report/report";
import Orders from "../components/Orders/orders";
import Order from "../components/Order/order";

const Routes = props => {
  return (
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <PrivateRoute isLogged={props.auth} path="/account" component={Account} />
      <PrivateRoute
        isLogged={props.auth}
        path="/restaurant"
        component={Restaurant}
      />
      <PrivateRoute isLogged={props.auth} path="/menu" component={Menu} />
      <PrivateRoute isLogged={props.auth} path="/orders" component={Orders} />
      <PrivateRoute isLogged={props.auth} path="/order" component={Order} />
      <PrivateRoute isLogged={props.auth} path="/report" component={Report} />
    </div>
  );
};

export default Routes;
