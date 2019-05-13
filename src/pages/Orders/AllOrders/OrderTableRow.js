import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import OrderDetailModal from "../components/OrderDetailModal";
import moment from "moment";
import { statusDisplayNames } from "../../../utils/displayNamesForVariables";

class OrderTableRow extends Component {
  state = {
    modalOpen: false
  };

  openModal = () => {
    this.setState({ modalOpen: true });
  };
  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    const { orderDoc } = this.props;
    const id = orderDoc.id;
    const {
      customerID,
      grandTotal,
      orderDate,
      status,
      table
    } = orderDoc.data();
    return (
      <React.Fragment>
        <Table.Row>
          <Table.Cell>{id}</Table.Cell>
          <Table.Cell>
            {moment(orderDate.toDate()).format("DD.MM.YYYY, hh:mm")}
          </Table.Cell>
          <Table.Cell>{statusDisplayNames[status]}</Table.Cell>
          <Table.Cell>{table ? table.name : "Tisch 2"}</Table.Cell>
          <Table.Cell>{parseFloat(grandTotal).toFixed(2)}€</Table.Cell>
          <Table.Cell collapsing textAlign="right">
            <Button
              content="Details"
              icon="info circle"
              basic
              compact
              onClick={() => {
                this.openModal();
              }}
            />
          </Table.Cell>
        </Table.Row>
        <OrderDetailModal
          orderDoc={orderDoc}
          open={this.state.modalOpen}
          onClose={this.closeModal}
        />
      </React.Fragment>
    );
  }
}
export default OrderTableRow;
