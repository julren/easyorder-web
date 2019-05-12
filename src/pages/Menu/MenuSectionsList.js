import React, { Component } from "react";
import { List, Button } from "semantic-ui-react";
import CreatemenuSectionModal from "./modals/CreateMenuSectionModal";

class MenuSectionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuSectionModalOpen: false,
      createMenuSectionModalOpen: false
    };
  }

  openAddMenuSectionModalOpen = () => {
    this.setState({ createMenuSectionModalOpen: true });
  };
  closeAddMenuSectionModalOpen = () => {
    this.setState({ createMenuSectionModalOpen: false });
    this.props.onDataChange();
  };

  render() {
    const {
      onSelectMenuSection,
      menuSectionDocs,
      selectedMenuSectionDoc
    } = this.props;
    return (
      <React.Fragment>
        <CreatemenuSectionModal
          open={this.state.menuSectionModalOpen}
          onClose={this.handleModalClose}
        />

        <List divided selection verticalAlign="middle">
          {menuSectionDocs.map((doc, index) => (
            <React.Fragment key={index}>
              <List.Item active={selectedMenuSectionDoc.id === doc.id}>
                <List.Content onClick={() => onSelectMenuSection(doc)}>
                  <List.Header>{doc.data().name}</List.Header>
                  {doc.data().description}
                </List.Content>
              </List.Item>
            </React.Fragment>
          ))}
        </List>

        <Button
          primary
          icon="plus"
          content="Abschnitt hinzufügen"
          onClick={this.openAddMenuSectionModalOpen}
        />

        <CreatemenuSectionModal
          open={this.state.createMenuSectionModalOpen}
          onClose={this.closeAddMenuSectionModalOpen}
        />
      </React.Fragment>
    );
  }
}

export default MenuSectionsList;
