import React from "react";
import { Table, Segment } from "semantic-ui-react";
import moment from "moment";

const OrderMetaDataSummary = props => {
  const { orderDoc } = props;
  const {
    orderDate,
    paymentMethod,
    table,
    status,
    customerID,
    completedDate = undefined
  } = orderDoc.data();

  return (
    <Table size="small">
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <b>Bestellnr: </b>
          </Table.Cell>
          <Table.Cell textAlign="left">{orderDoc.id}</Table.Cell>
          <Table.Cell>
            <b>Kundennummer:</b>
          </Table.Cell>
          <Table.Cell textAlign="left">{customerID}</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>
            <b>Bestelldatum: </b>
          </Table.Cell>
          <Table.Cell textAlign="left">
            {moment(orderDate.toDate()).format("DD.MM.YYYY, hh:mm")}
          </Table.Cell>

          <Table.Cell>
            <b>Zahlungsmethode</b>
          </Table.Cell>
          <Table.Cell textAlign="left">{paymentMethod}</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>
            <b>Tisch:</b>
          </Table.Cell>
          <Table.Cell textAlign="left">{table}</Table.Cell>

          <Table.Cell>
            <b>Zeitaufwand</b>
          </Table.Cell>

          <Table.Cell textAlign="left">
            {completedDate
              ? moment(orderDate.toDate()).diff(
                  completedDate.toDate(),
                  "minutes"
                )
              : status}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default OrderMetaDataSummary;
