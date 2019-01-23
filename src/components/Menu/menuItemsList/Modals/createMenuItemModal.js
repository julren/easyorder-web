import React from "react";
import { Modal } from "semantic-ui-react";
import { firebase, firebaseMenuItems } from "../../../../config/firebase";
import MenuItemForm from "./menuItemForm";
import StorageHandler from "../../../FormHelper/storageHandler";

const CreateMenuItemModal = props => {
  const { categoryID, open, onClose } = props;

  const handleSubmit = async (values, formikApi) => {
    const { photo } = values;
    const hasPhotoFile = photo instanceof Blob;

    const authorID = firebase.auth().currentUser.uid;
    const newMenuItemDocument = firebaseMenuItems.doc();

    let dataToSubmit = values;

    if (hasPhotoFile) {
      const fileName = `menuItem-${newMenuItemDocument.id}`;
      await StorageHandler.uploadImage({
        file: photo,
        fileName: fileName
      }).then(downloadURL => {
        dataToSubmit.photo = downloadURL;
      });
    }

    newMenuItemDocument
      .set({
        authorID: authorID,
        categoryID: categoryID,
        ...values
      })
      .then(() => {
        formikApi.setSubmitting(false);
        onClose();
        return;
      })
      .catch(error => {
        console.error(error);
        return;
      });
  };

  return (
    <Modal dimmer={true} open={open} onClose={onClose}>
      <Modal.Header>Gericht hinzufügen</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <MenuItemForm onSubmit={handleSubmit} />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default CreateMenuItemModal;
