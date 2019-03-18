import React from "react";
import { Modal } from "semantic-ui-react";
import { firebase, firebaseMenuItems } from "../../../../config/firebase";
import MenuItemForm from "./menuItemForm";
import StorageHandler from "../../../../components/FormHelper/storageHandler";

const CreateMenuItemModal = props => {
  const { categoryID, open, onClose } = props;

  const handleSubmit = async (values, formikApi) => {
    const { photo } = values;
    const hasPhotoFile = photo instanceof Blob;

    const authorID = firebase.auth().currentUser.uid;
    const newMenuItemDocument = firebaseMenuItems.doc();

    let dataToSubmit = values;

    if (hasPhotoFile) {
      // Upload big image (600px)
      const fileName = `menuItem-${newMenuItemDocument.id}`;
      await StorageHandler.uploadImage({
        file: photo,
        fileName: fileName,
        downScalingMaxWidth: 600
      }).then(downloadURL => {
        dataToSubmit.photo = downloadURL;
      });

      // Upload Thumbnail (100px)
      const thumbFileName = `menuItem-${newMenuItemDocument.id}-thumb`;
      await StorageHandler.uploadImage({
        file: photo,
        fileName: thumbFileName,
        downScalingMaxWidth: 100
      }).then(downloadURL => {
        dataToSubmit.photoThumb = downloadURL;
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
      <Modal.Header style={{ backgroundColor: "#008ACD", color: "#fff" }}>
        Gericht hinzufügen
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <MenuItemForm onSubmit={handleSubmit} />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default CreateMenuItemModal;
