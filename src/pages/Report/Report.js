import React, { Component } from "react";

import { Container, Header, Grid, Progress } from "semantic-ui-react";
import RestaurantReviewsReport from "./RestaurantReviewsReport";
import CurrentOrderStatusReport from "./CurrentOrderStatusReport";
import SalesReport from "./SalesReport";
import BestAndWorstRatedMenuItemsReport from "./BestAndWorstRatedMenuItemsReport";
import MenuItemsReviewsReport from "./MenuItemsReviewsReport";
import TableWaitingTimesReport from "./TableWaitingTimesReport";

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
        <Grid stackable columns={2}>
          <Grid.Column>
            <CurrentOrderStatusReport />

            <RestaurantReviewsReport />
            <TableWaitingTimesReport />
          </Grid.Column>
          <Grid.Column>
            <SalesReport />

            <BestAndWorstRatedMenuItemsReport />

            <MenuItemsReviewsReport />
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default Report;
