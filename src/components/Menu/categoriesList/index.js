import React, { Component } from "react";
import {
  List,
  Header,
  Button,
  Image,
  Container,
  Menu,
  Label,
  Segment
} from "semantic-ui-react";
import { firebase, db } from "../../../config/firebase";
import CreateCategoryModal from "./createCategoryModal";

class CategoriesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryModalOpen: false,
      categories: []
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.getMenuSections();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleModalOpen = () => {
    this.setState({ categoryModalOpen: true });
  };

  handleModalClose = () => {
    this.getMenuSections();
    this.setState({ categoryModalOpen: false });
  };

  getMenuSections = () => {
    db.collection("categories")
      .where("authorID", "==", firebase.auth().currentUser.uid)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) {
          console.log("No Categories for uid", firebase.auth().currentUser.uid);
        } else {
          let categories = [];
          querySnapshot.forEach(doc => {
            const category = { id: doc.id, ...doc.data() };
            categories.push(category);
          });
          if (this._isMounted) {
            this.setState({ categories: categories });
          }
        }
      })
      .catch(error => {
        console.error("Error getting document: ", error);
      });
  };

  render() {
    const { onCategorySelect } = this.props;

    return (
      <React.Fragment>
        <CreateCategoryModal
          open={this.state.categoryModalOpen}
          onClose={this.handleModalClose}
        />
        <Menu secondary vertical fluid>
          {this.state.categories.map((item, index) => (
            <Menu.Item
              key={index}
              name={item.name}
              active={item.id === this.props.activeCategoryID}
              onClick={() => onCategorySelect(item)}
            />
          ))}
        </Menu>

        <Button
          compact
          basic
          content="Kategorie erstellen"
          onClick={this.handleModalOpen}
        />
      </React.Fragment>
    );
  }
}

export default CategoriesList;
