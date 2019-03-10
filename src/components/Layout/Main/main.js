import React, { Component } from "react";
import "./main.css";
import { Container } from "semantic-ui-react";

class Main extends Component {
  render() {
    return <Container>{this.props.children}</Container>;
  }
}

export default Main;
