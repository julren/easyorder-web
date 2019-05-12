import React from "react";
import { Modal } from "semantic-ui-react";
import MenuItemForm from "./MenuItemForm";
import storageHandler from "../../../components/formHelper/storageHandler";

const CreateMenuItemModal = props => {
  const { selectedMenuSectionDoc, menuSectionDocs, open, onClose } = props;

  const handleSubmit = async (values, formikApi) => {
    const { photo } = values;
    const hasPhotoFile = photo instanceof Blob;

    const newMenuItemDocument = selectedMenuSectionDoc.ref
      .collection("menuItems")
      .doc();

    let dataToSubmit = values;
    dataToSubmit.price = parseFloat(values.price);

    if (hasPhotoFile) {
      // Upload big image (600px)
      const fileName = `menuItem-${newMenuItemDocument.id}`;
      await storageHandler
        .uploadImage({
          file: photo,
          fileName: fileName,
          downScalingMaxWidth: 600
        })
        .then(downloadURL => {
          dataToSubmit.photo = downloadURL;
        });

      // Upload Thumbnail (100px)
      const thumbFileName = `menuItem-${newMenuItemDocument.id}-thumb`;
      await storageHandler
        .uploadImage({
          file: photo,
          fileName: thumbFileName,
          downScalingMaxWidth: 100
        })
        .then(downloadURL => {
          dataToSubmit.photoThumb = downloadURL;
        });
    }

    console.log("CreateMenuItemModal handleSubmit dataToSubmit", dataToSubmit);

    newMenuItemDocument
      .set({
        ...dataToSubmit
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
