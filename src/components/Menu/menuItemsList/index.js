import React, { Component } from "react";
import {
  List,
  Header,
  Button,
  Table,
  Container,
  Segment
} from "semantic-ui-react";
import { firebase, db } from "../../../config/firebase";
import CreateMenuItemModal from "./Modals/createMenuItemModal";
import MenuItemsListItem from "./menuItemsListItem";
import EditMenuItemModal from "./Modals/editMenuItemModal";

class MenuItemsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createMenuItemModalOpen: false,
      editMenuItemModalOpenIndex: null,
      menuItemDocs: [],
      loading: false
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.getMenuItemDocs();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ loading: true, menuItemDocs: [] });
      this.getMenuItemDocs();
    }
  }

  handleModalOpen = () => {
    this.setState({ createMenuItemModalOpen: true });
  };

  handleModalClose = () => {
    this.setState({ createMenuItemModalOpen: false });
    this.getMenuItemDocs();
  };

  handleEditMenuItemModalOpen = index => {
    this.setState({ editMenuItemModalOpenIndex: index });
  };

  handleEditMenuItemModalClose = () => {
    this.setState({ editMenuItemModalOpenIndex: null });
    this.getMenuItemDocs();
  };

  onDelete = doc => {
    console.log("onDelete", doc);
    doc.ref
      .delete()
      .then(this.getMenuItemDocs())
      .catch(error => console.error(error));
  };

  getMenuItemDocs = () => {
    db.collection("menuItems")
      .where("categoryID", "==", this.props.categoryID)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) {
          console.log("No menuItems for categoryID ", this.props.categoryID);
        } else {
          let menuItemDocs = [];

          querySnapshot.forEach(doc => {
            menuItemDocs.push(doc);
          });
          if (this._isMounted) {
            this.setState({ menuItemDocs: menuItemDocs });
          }
        }
        this.setState({ loading: false });
      })
      .catch(error => {
        console.error("Error getting document: ", error);
      });
  };

  renderMenuItemTable = () => {
    const { menuItemDocs } = this.state;

    if (menuItemDocs.length <= 0) {
      return <Container>Noch keine Gerichte angelegt</Container>;
    } else {
      return (
        <Table basic compact singleLine verticalAlign="middle">
          <Table.Body>
            {menuItemDocs.map((doc, index) => (
              <React.Fragment key={index}>
                <MenuItemsListItem
                  menuItemDoc={doc}
                  onEdit={() => this.handleEditMenuItemModalOpen(index)}
                  onDelete={() => this.onDelete(doc)}
                />

                <EditMenuItemModal
                  menuItemDoc={doc}
                  categoryID={this.props.categoryID}
                  open={this.state.editMenuItemModalOpenIndex === index}
                  onClose={this.handleEditMenuItemModalClose}
                />
              </React.Fragment>
            ))}
          </Table.Body>
        </Table>
      );
    }
  };

  render() {
    const { handleModalOpen } = this;
    const { categoryID, categoryName } = this.props;

    return (
      <React.Fragment>
        <CreateMenuItemModal
          categoryID={this.props.categoryID}
          open={this.state.createMenuItemModalOpen}
          onClose={this.handleModalClose}
        />
        <Header as="h3" content={categoryName} />

        {/* <Segment basic>
          <Button basic content="Kategorie löschen" floated="right" />
          <Button basic content="Kategorie bearbeiten" floated="right" />
        </Segment> */}
        <Segment basic loading={this.state.loading}>
          {this.renderMenuItemTable()}
        </Segment>
        <Segment basic clearing>
          <Button
            basic
            color="green"
            content="Gericht hinzufügen"
            floated="right"
            onClick={handleModalOpen}
          />
        </Segment>
      </React.Fragment>
    );
  }
}

export default MenuItemsList;
