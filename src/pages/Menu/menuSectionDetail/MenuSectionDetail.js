import React, { Component } from "react";
import { Header, Button, Table, Container, Segment } from "semantic-ui-react";
import { db, firebase } from "../../../config/firebase";
import CreateMenuItemModal from "../modals/CreateMenuItemModal";
import MenuItemsListItem from "./MenuItemsListItem";
import EditMenuItemModal from "../modals/EditMenuItemModal";
import Restaurant from "../../restaurant/Resturant";
import MenuSectionInfos from "./MenuSectionInfos";

class MenuSectionDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createMenuItemModalOpen: false,
      editMenuItemModalOpenIndex: null,
      menuItemDocs: [],
      loading: true
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.getMenuItemDocs();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ menuItemDocs: [], loading: true });
      this.getMenuItemDocs();
    }
  }

  openCreateMenuItemModal = () => {
    this.setState({
      createMenuItemModalOpen: true
    });
  };
  closeCreateMenuItemModal = () => {
    this.setState({ createMenuItemModalOpen: false });
    this.getMenuItemDocs();
  };

  openEditMenuItemModal = editMenuItemModalOpenIndex => {
    this.setState({
      editMenuItemModalOpenIndex: editMenuItemModalOpenIndex
    });
  };

  closeEditMenuItemModal = () => {
    this.setState({ editMenuItemModalOpenIndex: null });
    this.getMenuItemDocs();
  };

  getMenuItemDocs = () => {
    this.props.selectedMenuSectionDoc.ref
      .collection("menuItems")
      .get()
      .then(querySnapshot => {
        let menuItemDocs = [];

        if (querySnapshot.empty) {
          console.log(
            "No menuItems for menuSection ",
            this.props.selectedMenuSectionDoc.data().name
          );
        } else {
          if (this._isMounted) {
            menuItemDocs = querySnapshot.docs;
          }
        }
        this.setState({ loading: false, menuItemDocs: menuItemDocs });
      })
      .catch(error => {
        console.error("Error getting document: ", error);
      });
  };

  onDelete = doc => {
    console.log("onDelete", doc);
    doc.ref
      .delete()
      .then(this.getMenuItemDocs())
      .catch(error => console.error(error));
  };

  renderMenuItemTable = () => {
    const { menuItemDocs } = this.state;
    if (menuItemDocs.length <= 0) {
      return <Container>Noch keine Gerichte angelegt</Container>;
    } else {
      return (
        <Table compact celled singleLine verticalAlign="middle">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Preis</Table.HeaderCell>
              <Table.HeaderCell>Bewertung</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {menuItemDocs.map((doc, index) => (
              <React.Fragment key={index}>
                <MenuItemsListItem
                  menuItemDoc={doc}
                  onEdit={() => this.openEditMenuItemModal(index)}
                  onDelete={() => this.onDelete(doc)}
                />

                <EditMenuItemModal
                  menuItemDoc={doc}
                  categoryID={this.props.categoryID}
                  open={this.state.editMenuItemModalOpenIndex === index}
                  onClose={this.closeEditMenuItemModal}
                />
              </React.Fragment>
            ))}
          </Table.Body>
        </Table>
      );
    }
  };

  render() {
    const {
      onDataChange,
      selectedMenuSectionDoc,
      menuSectionDocs
    } = this.props;

    return (
      <React.Fragment>
        <MenuSectionInfos
          selectedMenuSectionDoc={selectedMenuSectionDoc}
          onDataChange={onDataChange}
        />

        <Segment basic attached loading={this.state.loading}>
          {this.renderMenuItemTable()}
        </Segment>
        <Segment basic clearing>
          <Button
            primary
            icon="plus"
            content="Gericht hinzufügen"
            floated="right"
            onClick={() => this.openCreateMenuItemModal()}
          />
        </Segment>

        <CreateMenuItemModal
          menuSectionDocs={menuSectionDocs}
          selectedMenuSectionDoc={selectedMenuSectionDoc}
          open={this.state.createMenuItemModalOpen}
          onClose={this.closeCreateMenuItemModal}
        />
      </React.Fragment>
    );
  }
}

export default MenuSectionDetail;
