import React from "react";
import { Modal } from "semantic-ui-react";
import { firebase, firebaseCategories } from "../../../../config/firebase";
import CategoryForm from "./categoryForm";

const CreateCategoryModal = props => {
  const { open, onClose } = props;

  const placeholderCategory = {
    name: "",
    description: ""
  };

  const handleSubmit = (values, formikApi) => {
    console.log("handleSubmit", values);
    const authorID = firebase.auth().currentUser.uid;

    firebaseCategories
      .add({
        authorID: authorID,
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
      <Modal.Header>Kategorie erstellen</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <CategoryForm
            initialValues={placeholderCategory}
            onSubmit={handleSubmit}
          />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default CreateCategoryModal;
