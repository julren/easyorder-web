import React from "react";
import { Header, Image, Modal } from "semantic-ui-react";
import { Button, Form, Input } from "formik-semantic-ui";
import { firebase, firebaseMenuItems } from "../../../../config/firebase";
import MenuItemForm from "./menuItemForm";
import PropTypes from "prop-types";

const EditMenuItemModal = props => {
  const { categoryID, open, onClose, menuItemDoc } = props;
  const authorID = firebase.auth().currentUser.uid;

  const handleSubmit = (values, formikApi) => {
    menuItemDoc.ref
      .set({
        authorID: authorID,
        categoryID: categoryID,
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
    <Modal dimmer={true} open={open} onClose={onClose}>
      <Modal.Header>Gericht bearbeiten</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <MenuItemForm
            fileName={`menuItems/${menuItemDoc.id}`}
            initialValues={menuItemDoc.data()}
            onSubmit={handleSubmit}
          />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default EditMenuItemModal;

EditMenuItemModal.propTypes = {
  menuItemDoc: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
