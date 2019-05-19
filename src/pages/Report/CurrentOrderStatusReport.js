import React, { Component } from "react";
import { Segment, Statistic, Header } from "semantic-ui-react";
import { firebaseOrders } from "../../config/firebase";
import { withRestaurantContext } from "../../contexts/withRestaurantContext";

class CurrentOrderStatusReport extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  sortByStatus = orderDocs => {
    console.log("sortByStatus", orderDocs);
    const sorted = {
      openOrdersDocs: [],
      inProgressOrdersDocs: [],
      readyForServingOrdersDocs: []
    };

    orderDocs.forEach(doc => {
      switch (doc.data().status) {
        case "open":
          sorted.openOrdersDocs.push(doc);
          break;
        case "inProgress":
          sorted.inProgressOrdersDocs.push(doc);
          break;
        case "readyForServing":
          sorted.readyForServingOrdersDocs.push(doc);
          break;
        default:
          console.log("unkown status of order: ", doc.uid);
      }
    });
    return sorted;
  };

  render() {
    const {
      openOrdersDocs,
      inProgressOrdersDocs,
      readyForServingOrdersDocs
    } = this.sortByStatus(this.props.restaurantContext.orderDocs);
    return (
      <Segment.Group>
        <Segment color="blue" inverted>
          <Header as="h2">🍴 Aktuelle Bestellungen</Header>
        </Segment>
        <Segment>
          <Statistic.Group size="small" widths="three">
            <Statistic color="blue">
              <Statistic.Value>{openOrdersDocs.length}</Statistic.Value>
              <Statistic.Label style={{ color: "#2185d0" }}>
                Offen
              </Statistic.Label>
            </Statistic>
            <Statistic color="yellow">
              <Statistic.Value>{inProgressOrdersDocs.length}</Statistic.Value>
              <Statistic.Label style={{ color: "#fbbd08" }}>
                In Bearbeitung
              </Statistic.Label>
            </Statistic>
            <Statistic color="green">
              <Statistic.Value>
                {readyForServingOrdersDocs.length}
              </Statistic.Value>
              <Statistic.Label style={{ color: "#21ba45" }}>
                Servierbereit
              </Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </Segment>
      </Segment.Group>
    );
  }
}

export default withRestaurantContext(CurrentOrderStatusReport);
