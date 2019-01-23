import React from "react";
import { Grid, Header, Container } from "semantic-ui-react";

const Order = props => {
  return (
    <Container>
      <Header as="h1" content="Bestellungen" />

      <Grid columns={3} divided stretched>
        <Grid.Row>
          <Grid.Column>
            <Header as="h2" content="Neu" />
          </Grid.Column>
          <Grid.Column>
            <Header as="h2" content="In Bearbeitung" />
          </Grid.Column>
          <Grid.Column>
            <Header as="h2" content="Servierbereit" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default Order;
