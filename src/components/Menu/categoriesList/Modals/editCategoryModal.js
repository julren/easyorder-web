import React from "react";
import { Modal } from "semantic-ui-react";
import CategoryForm from "./categoryForm";

const EditCategoryModal = props => {
  const { open, onClose, categoryDoc } = props;

  const handleSubmit = async (values, formikApi) => {
    categoryDoc.ref
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
      <Modal.Header>Gericht bearbeiten</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <CategoryForm
            initialValues={categoryDoc.data()}
            onSubmit={handleSubmit}
          />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default EditCategoryModal;
