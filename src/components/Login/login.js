import React, { Component } from "react";
import LoginForm from "./LoginForm/loginform";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }

  render() {
    return (
      <div>
        <h1>Login</h1>

        <LoginForm />
      </div>
    );
  }
}

export default Login;
