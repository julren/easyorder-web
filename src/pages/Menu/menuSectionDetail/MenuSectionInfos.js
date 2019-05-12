import React, { Component } from "react";
import { Segment, Header, Button } from "semantic-ui-react";
import EditMenuSectionModal from "../modals/EditMenuSectionModal";

class MenuSectionInfos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMenuSectionModal: false
    };
  }

  openEditMenuSectionModal = () => {
    this.setState({ editMenuSectionModal: true });
  };
  closeEditMenuSectionModal = () => {
    this.setState({ editMenuSectionModal: false });
    this.props.onDataChange();
  };

  onDelete = doc => {
    console.log("onDelete", doc);
    this.props.selectedMenuSectionDoc.ref
      .delete()
      .then(this.props.onDataChange())
      .catch(error => console.error(error));
  };

  render() {
    const { selectedMenuSectionDoc, onDataChange } = this.props;
    return (
      <Segment color="blue" inverted attached>
        <Header content={selectedMenuSectionDoc.data().name} floated="left" />

        <Button icon="trash" floated="right" onClick={() => this.onDelete()} />
        <Button
          icon="pencil"
          floated="right"
          onClick={() => this.openEditMenuSectionModal()}
        />

        <EditMenuSectionModal
          open={this.state.editMenuSectionModal}
          onClose={this.closeEditMenuSectionModal}
          menuSectionDoc={selectedMenuSectionDoc}
        />
      </Segment>
    );
  }
}

export default MenuSectionInfos;
