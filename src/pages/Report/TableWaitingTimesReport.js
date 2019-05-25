import React, { Component } from "react";
import { Segment, Statistic, Header, List } from "semantic-ui-react";
import { firebaseOrders } from "../../config/firebase";
import { withRestaurantContext } from "../../contexts/withRestaurantContext";
import moment from "moment";
import { statusDisplayNames } from "../../utils/displayNamesForVariables";

class TableWaitingTimesReport extends Component {
  constructor(props) {
    super(props);
    this.state = { sortedOrders: [] };
  }

  componentDidMount() {
    this.sortOrderDocs(this.props.restaurantContext.orderDocs);
  }

  sortOrderDocs = docs => {
    const sortedOrders = docs
      .map(doc => {
        return { ...doc.data(), orderDate: doc.data().orderDate.toDate() };
      })
      .filter(order => order.status != "archived")
      .sort((a, b) => {
        return a.orderDate - b.orderDate;
      });

    this.setState({ sortedOrders: sortedOrders });
  };

  render() {
    const { sortedOrders } = this.state;
    return (
      <Segment.Group>
        <Segment color="blue" inverted>
          <Header as="h2">🕐 Offene Bestellungen mit lägster Wartezeit</Header>
        </Segment>
        <Segment>
          <List verticalAlign="middle">
            {sortedOrders.map(order => (
              <List.Item>
                <List.Content floated="right">
                  <List.Header>{moment(order.orderDate).fromNow()}</List.Header>
                </List.Content>

                <List.Header>
                  {order.table ? order.table.name : null}
                </List.Header>
                <List.Description>
                  {statusDisplayNames[order.status]}
                </List.Description>
              </List.Item>
            ))}
          </List>
        </Segment>
      </Segment.Group>
    );
  }
}

export default withRestaurantContext(TableWaitingTimesReport);
