import React, { Component } from "react";
import { Header, Container, Card, Segment } from "semantic-ui-react";
import AllOrdersTable from "./AllOrdersTable";

class AllOrders extends Component {
  render() {
    return (
      <Container>
        <Header
          as="h1"
          content="Alle Bestellungen"
          subheader="Alle Bestellungen betrachten, suchen, filtern"
        />
        <AllOrdersTable />
      </Container>
    );
  }
}

export default AllOrders;
