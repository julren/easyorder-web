import React, { Component } from "react";

import { Container, Header, Grid } from "semantic-ui-react";

class Report extends Component {
  state = {};

  render() {
    return (
      <Container>
        <Header as="h1">
          Auswertungen
          <Header.Subheader>
            Geschäftsdaten überwachen und neue Erkenntnisse gewinnen
          </Header.Subheader>
        </Header>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4} />
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default Report;
