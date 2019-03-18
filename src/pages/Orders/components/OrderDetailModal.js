import React, { Component } from "react";
import {
  Modal,
  List,
  Image,
  Table,
  ListItem,
  Segment,
  Step,
  Header,
  Button
} from "semantic-ui-react";
import moment from "moment";
import OrderTable from "./OrderTable";
import StatusProgressStepper from "./StatusProgressStepper";
import OrderMetaDataSummary from "./OrderMetaDataSummary";
const OrderDetailModal = props => {
  const { orderDoc, open, onClose } = props;
  const {
    grandTotal,
    items,
    mwst,
    orderDate,
    paymentMethod,
    table,
    status
  } = orderDoc.data();

  return (
    <Modal dimmer={true} open={open} onClose={onClose}>
      <Modal.Header style={{ backgroundColor: "#008ACD", color: "#fff" }}>
        Details zur Bestellung
      </Modal.Header>

      <Modal.Content>
        <StatusProgressStepper status={status} />
        <OrderMetaDataSummary orderDoc={orderDoc} />

        <OrderTable orderDoc={orderDoc} />
      </Modal.Content>

      <Modal.Actions>
        <Button primary onClick={onClose}>
          Fertig
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default OrderDetailModal;
