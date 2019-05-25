import React, { Component } from "react";
import { Modal } from "semantic-ui-react";
import MenuSectionForm from "./MenuSectionForm";
import { db, firebase } from "../../../config/firebase";
import { withRestaurantContext } from "../../../contexts/withRestaurantContext";

class CreateMenuSectionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(this.props.restaurantContext);
  }

  handleSubmit = (values, formikApi) => {
    console.log("handleSubmit", values);

    db.collection("restaurants")
      .doc(firebase.auth().currentUser.uid)
      .collection("menuSections")
      .add({
        ...values
      })
      .then(() => {
        formikApi.setSubmitting(false);
        this.props.onClose();
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    const { open, onClose } = this.props;
    return (
      <Modal size="small" dimmer={true} open={open} onClose={onClose}>
        <Modal.Header style={{ backgroundColor: "#008ACD", color: "#fff" }}>
          Abschnitt erstellen
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <MenuSectionForm
              initialValues={placeholderCategory}
              onSubmit={this.handleSubmit}
            />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default withRestaurantContext(CreateMenuSectionModal);

const placeholderCategory = {
  name: "",
  description: "",
  orderNum: 0
};
