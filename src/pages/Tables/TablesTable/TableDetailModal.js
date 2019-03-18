import React from "react";
import { Modal, Button } from "semantic-ui-react";
import TableForm from "../TableForm";

const TableDetailModal = props => {
  const { tableDoc, open, onClose } = props;
  const { name, capacity } = tableDoc.data();

  const handleSubmit = (values, formikApi) => {
    console.log("handleSubmit", values);
    tableDoc.ref
      .update(values)
      .then(() => {
        formikApi.setSubmitting(false);
        onClose();
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <Modal dimmer={true} open={open} onClose={onClose}>
      <Modal.Header style={{ backgroundColor: "#008ACD", color: "#fff" }}>
        Details zum Tisch
      </Modal.Header>

      <Modal.Content>
        <TableForm initialValues={tableDoc.data()} onSubmit={handleSubmit} />
      </Modal.Content>

      <Modal.Actions>
        <Button primary onClick={onClose}>
          Fertig
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default TableDetailModal;
