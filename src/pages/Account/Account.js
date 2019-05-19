import React, { Component } from "react";

import { Header, Container, Segment } from "semantic-ui-react";
import ChangeEmailForm from "./ChangePasswordForm";
import ChangePasswordForm from "./ChangeEmailForm";

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <Container>
        <Header
          as="h1"
          content="Account"
          subheader="Account verwalten: Passwort & Email ändern"
        />
        <ChangeEmailForm />
        <ChangePasswordForm />
      </Container>
    );
  }
}

export default Account;
