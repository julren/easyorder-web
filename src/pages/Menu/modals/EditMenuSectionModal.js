import React from "react";
import { Modal } from "semantic-ui-react";
import MenuSectionForm from "./MenuSectionForm";

const EditMenuSectionModal = props => {
  const { open, onClose, menuSectionDoc } = props;

  const handleSubmit = async (values, formikApi) => {
    menuSectionDoc.ref
      .set(values)
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
        Abschnitt bearbeiten
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <MenuSectionForm
            initialValues={menuSectionDoc.data()}
            onSubmit={handleSubmit}
          />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default EditMenuSectionModal;
