import React, { Component } from "react";
import {
  Table,
  Button,
  Icon,
  Input,
  Segment,
  Menu,
  Loader
} from "semantic-ui-react";
import _ from "lodash";
import { db, firebase } from "../../../config/firebase";
import moment from "moment";
import OrderDetailModal from "../components/OrderDetailModal";
import OrderTableRow from "./OrderTableRow";
import { statusDisplayNames } from "../../../utils/displayNamesForVariables";

class AllOrdersTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column: null,
      diplayedOrderDocs: [],
      orderDocs: [],
      direction: null,
      loading: true
    };
  }

  componentDidMount() {
    this.getOrders();
  }

  getOrders = () => {
    db.collection("orders")
      .where("restaurant.restaurantID", "==", firebase.auth().currentUser.uid)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) {
          console.log(
            "No orders for restaurantID ",
            firebase.auth().currentUser.uid
          );
        } else {
          let orderDocs = [];
          querySnapshot.forEach(doc => {
            orderDocs.push(doc);
          });
          this.setState({
            orderDocs: orderDocs,
            diplayedOrderDocs: orderDocs,
            loading: false
          });
        }
      });
  };

  handleSort = clickedColumn => () => {
    const { column, diplayedOrderDocs, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        diplayedOrderDocs: _.sortBy(diplayedOrderDocs, function(o) {
          return o.data()[clickedColumn];
        }),
        direction: "ascending"
      });

      return;
    }

    this.setState({
      diplayedOrderDocs: diplayedOrderDocs.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending"
    });
  };

  handleSearch = event => {
    const searchTerm = event.target.value;
    const { orderDocs, diplayedOrderDocs } = this.state;

    const filtered = _.filter(orderDocs, function(o) {
      const id = o.id;
      const {
        status,
        table: { name: tableName },
        grandTotal,
        orderDate,
        customerID,
        paymentMethod
      } = o.data();
      const searchString =
        id +
        statusDisplayNames[status] +
        tableName +
        grandTotal +
        customerID +
        paymentMethod +
        moment(orderDate.toDate()).format("DD.MM.YYYY, hh:mm");

      return searchString.toLowerCase().includes(searchTerm.toLowerCase());
    });

    this.setState({
      diplayedOrderDocs: filtered
    });

    if (searchTerm === "") {
      this.setState({ diplayedOrderDocs: orderDocs });
    }
  };

  render() {
    const { column, direction, diplayedOrderDocs, loading } = this.state;

    if (loading) return <Loader active inline="centered" />;
    return (
      <React.Fragment>
        <Segment attached="top" color="blue" inverted>
          <Input
            size="small"
            icon="search"
            placeholder="Suchen..."
            onChange={this.handleSearch}
          />
        </Segment>
        <Table sortable celled fixed striped attached>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === "id" ? direction : null}
                onClick={this.handleSort("id")}
              >
                ID
              </Table.HeaderCell>

              <Table.HeaderCell
                sorted={column === "date" ? direction : null}
                onClick={this.handleSort("date")}
              >
                Date
              </Table.HeaderCell>

              <Table.HeaderCell
                sorted={column === "status" ? direction : null}
                onClick={this.handleSort("status")}
              >
                Staus
              </Table.HeaderCell>

              <Table.HeaderCell
                sorted={column === "table" ? direction : null}
                onClick={this.handleSort("table")}
              >
                Tisch
              </Table.HeaderCell>

              <Table.HeaderCell
                sorted={column === "grandTotal" ? direction : null}
                onClick={this.handleSort("grandTotal")}
              >
                Gesamtbetrag
              </Table.HeaderCell>

              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {diplayedOrderDocs.map(doc => (
              <OrderTableRow orderDoc={doc} key={doc.id} />
            ))}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="6">
                <Menu floated="right" pagination>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron left" />
                  </Menu.Item>
                  <Menu.Item as="a">1</Menu.Item>
                  <Menu.Item as="a">2</Menu.Item>
                  <Menu.Item as="a">3</Menu.Item>
                  <Menu.Item as="a">4</Menu.Item>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron right" />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </React.Fragment>
    );
  }
}

export default AllOrdersTable;
