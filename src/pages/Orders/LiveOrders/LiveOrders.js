import React, { Component } from "react";
import { Header, Container, Card, Segment } from "semantic-ui-react";

import LiveOrdersBoard from "./LiveOrdersBoard";

class Order extends Component {
  render() {
    return (
      <Container>
        <Header
          as="h1"
          content="Live Bestellungen"
          subheader="Aktuelle Bestellungen schnell und effizient bearbeiten"
        />

        <LiveOrdersBoard />
      </Container>
    );
  }
}

export default Order;
