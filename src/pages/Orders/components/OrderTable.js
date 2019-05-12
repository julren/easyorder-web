import React from "react";
import { Modal, List, Image, Table, ListItem } from "semantic-ui-react";

const OrderTable = props => {
  const {
    grandTotal,
    items,
    mwst,
    orderDate,
    paymentMethod,
    table,
    status
  } = props.orderDoc.data();

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Foto</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell textAlign="right">Anzahl</Table.HeaderCell>
          <Table.HeaderCell textAlign="right">Einzelpreis</Table.HeaderCell>
          <Table.HeaderCell textAlign="right">Gesamt</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {items.map((element, index) => (
          <Table.Row key={index}>
            <Table.Cell collapsing>
              <Image size="mini" src={element.item.photo} />
            </Table.Cell>
            <Table.Cell>
              {element.item.name}
              <span style={{ color: "grey" }}>
                <br />
                {element.item.description}
              </span>
            </Table.Cell>
            <Table.Cell collapsing textAlign="right">
              {element.quantity}
            </Table.Cell>
            <Table.Cell collapsing textAlign="right">
              {parseFloat(element.item.price).toFixed(2)}
            </Table.Cell>

            <Table.Cell collapsing textAlign="right">
              {parseFloat(element.quantity * element.item.price).toFixed(2)}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>

      <Table.Footer>
        {/* <Table.Row>
          <Table.HeaderCell colSpan="4" textAlign="right">
            Mwst
          </Table.HeaderCell>
          <Table.HeaderCell collapsing textAlign="right">
            {parseFloat(mwst).toFixed(2)}
          </Table.HeaderCell>
        </Table.Row> */}
        <Table.Row>
          <Table.HeaderCell colSpan="4" textAlign="right">
            <b>Gesamt</b>
          </Table.HeaderCell>
          <Table.HeaderCell collapsing textAlign="right">
            <b>{parseFloat(grandTotal).toFixed(2)}</b>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

export default OrderTable;
