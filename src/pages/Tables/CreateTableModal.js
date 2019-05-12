import React from "react";
import { Modal } from "semantic-ui-react";
import TableForm from "./TableForm";
import { db, firebase } from "../../config/firebase";

const CreateTableModal = props => {
  const { open, onClose } = props;

  const handleSubmit = (values, formikApi) => {
    console.log("handleSubmit", values);

    db.collection("restaurants")
      .doc(firebase.auth().currentUser.uid)
      .collection("tables")
      .add({
        ...values
      })
      .then(() => {
        formikApi.setSubmitting(false);
        onClose();
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <Modal size="small" dimmer={true} open={open} onClose={onClose}>
      <Modal.Header style={{ backgroundColor: "#008ACD", color: "#fff" }}>
        Tisch hinzufügen
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <TableForm onSubmit={handleSubmit} />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default CreateTableModal;
