import React, { Component } from "react";
import { firebase } from "../../config/firebase";
import { Modal, Header, Button, Icon, Input } from "semantic-ui-react";
import ShowPropsInUi from "../../utils/ShowPropsInUI";

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = { user: { email: "", uid: "" }, modalOpen: false };
  }

  componentDidMount() {
    let currentUser = firebase.auth().currentUser;
    if (currentUser) {
      this.setState({ user: currentUser });
    }
  }

  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => this.setState({ modalOpen: false });

  render() {
    return (
      <div>
        <h1>Account</h1>
        <ShowPropsInUi props={this.state} />
        {this.state.user.email} -{this.state.user.uid}
      </div>
    );
  }
}

export default Account;
