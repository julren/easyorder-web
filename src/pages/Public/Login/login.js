import React, { Component } from "react";
import LoginForm from "./LoginForm/loginform";
import AuthLayout from "../hoc/authLayout";
import { Header } from "semantic-ui-react";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }

  render() {
    return (
      <AuthLayout>
        <Header as="h1">Login</Header>

        <LoginForm />
      </AuthLayout>
    );
  }
}

export default Login;
