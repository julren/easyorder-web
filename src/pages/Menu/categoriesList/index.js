import React, { Component } from "react";
import { List, Button } from "semantic-ui-react";
import { firebase, db } from "../../../config/firebase";
import CreateCategoryModal from "./Modals/createCategoryModal";
import CategoriesListItem from "./categoriesListItem";
import EditCategoryModal from "./Modals/editCategoryModal";

class CategoriesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryModalOpen: false,
      categoriesDocs: [],
      editCategoryModalOpenIndex: null
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ loading: true, categoriesDocs: [] });
      this.getMenuSections();
    }
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

  handleEditCategoryModalOpen = index => {
    this.setState({ editCategoryModalOpenIndex: index });
  };

  handleEditCategoryModalClose = () => {
    this.setState({ editCategoryModalOpenIndex: null });
    this.getMenuSections();
  };

  getMenuSections = () => {
    db.collection("categories")
      .where("authorID", "==", firebase.auth().currentUser.uid)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) {
          console.log("No Categories for uid", firebase.auth().currentUser.uid);
        } else {
          let categoriesDocs = [];
          querySnapshot.forEach(doc => {
            categoriesDocs.push(doc);
          });
          if (this._isMounted) {
            this.setState({ categoriesDocs: categoriesDocs });
          }
        }
      })
      .catch(error => {
        console.error("Error getting document: ", error);
      });
  };

  onDelete = doc => {
    console.log("onDelete", doc);
    doc.ref
      .delete()
      .then(this.getMenuSections())
      .catch(error => console.error(error));
  };

  render() {
    const { onCategorySelect } = this.props;

    return (
      <React.Fragment>
        <CreateCategoryModal
          open={this.state.categoryModalOpen}
          onClose={this.handleModalClose}
        />

        <List divided selection verticalAlign="middle">
          {this.state.categoriesDocs.map((doc, index) => (
            <React.Fragment key={index}>
              <CategoriesListItem
                item={doc}
                onClick={() => onCategorySelect(doc)}
                onEdit={() => this.handleEditCategoryModalOpen(index)}
                onDelete={() => this.onDelete(doc)}
              />

              <EditCategoryModal
                categoryDoc={doc}
                open={this.state.editCategoryModalOpenIndex === index}
                onClose={this.handleEditCategoryModalClose}
              />
            </React.Fragment>
          ))}
        </List>

        <Button
          primary
          icon="plus"
          content="Kategorie hinzufügen"
          onClick={this.handleModalOpen}
        />
      </React.Fragment>
    );
  }
}

export default CategoriesList;
