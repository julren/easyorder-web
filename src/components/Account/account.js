import React, { Component } from "react";
import { firebase } from "../../config/firebase";

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = { user: { email: "", uid: "" } };
  }

  componentDidMount() {
    let currentUser = firebase.auth().currentUser;
    if (currentUser) {
      this.setState({ user: currentUser });
    }
  }

  render() {
    return (
      <div>
        <h1>Account</h1>
        {this.state.user.email} -{this.state.user.uid}
      </div>
    );
  }
}

export default Account;
