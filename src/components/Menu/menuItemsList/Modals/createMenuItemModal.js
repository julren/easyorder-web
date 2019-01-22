import React from "react";
import { Header, Image, Modal } from "semantic-ui-react";
import { Button, Form, Input } from "formik-semantic-ui";
import { firebase, firebaseMenuItems } from "../../../../config/firebase";
import MenuItemForm from "./menuItemForm";

const CreateMenuItemModal = props => {
  const placeholderMenuItem = {
    name: "",
    description: "",
    price: "",
    allergens: "",
    photoURL: "",
    rating: "",
    numOfRatinga: "",
    displayOrderIndex: ""
  };
  const { categoryID, open, onClose } = props;
  const authorID = firebase.auth().currentUser.uid;

  const newMenuItemDocument = firebaseMenuItems.doc();

  const handleSubmit = (values, formikApi) => {
    newMenuItemDocument
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

  console.log("newMenuItemDocumentid", newMenuItemDocument.id);

  return (
    <Modal dimmer={true} open={open} onClose={onClose}>
      <Modal.Header>Gericht hinzufügen</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <MenuItemForm
            onSubmit={handleSubmit}
            fileName={`menuItems/${newMenuItemDocument.id}`}
          />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default CreateMenuItemModal;
