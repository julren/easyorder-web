import React from "react";
import { Modal } from "semantic-ui-react";
import MenuItemForm from "./menuItemForm";
import PropTypes from "prop-types";
import StorageHandler from "../../../../components/FormHelper/storageHandler";

const EditMenuItemModal = props => {
  const { open, onClose, menuItemDoc } = props;

  const handleSubmit = async (values, formikApi) => {
    const { photo } = values;
    const hasPhotoFile = photo instanceof Blob;

    let dataToSubmit = values;

    if (hasPhotoFile) {
      const fileName = `menuItem-${menuItemDoc.id}`;
      await StorageHandler.uploadImage({
        file: photo,
        fileName: fileName
      }).then(downloadURL => {
        dataToSubmit.photo = downloadURL;
      });
    }

    menuItemDoc.ref
      .set(dataToSubmit)
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
      <Modal.Header>Gericht bearbeiten</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <MenuItemForm
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
