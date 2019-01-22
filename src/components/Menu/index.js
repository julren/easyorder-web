import React, { Component } from "react";
import {
  Image,
  Segment,
  Header,
  Accordion,
  Icon,
  List,
  Modal,
  Container,
  Table,
  Rating,
  FormInput,
  Grid
} from "semantic-ui-react";
import { Button, Input } from "formik-semantic-ui";
import ShowPropsInUI from "../../utils/ShowPropsInUI";
import { firebase, db, firebaseMenus } from "../../config/firebase";
import { Formik, Field, Form, FieldArray } from "formik";
import CategoriesList from "./categoriesList";
import MenuItemsList from "./menuItemsList";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorySelected: false,
      selectedCategoryData: { name: "", id: "" }
    };
  }

  handleCategorySelected = selectedCategoryData => {
    this.setState({
      categorySelected: true,
      selectedCategoryData: selectedCategoryData
    });
  };

  renderMenuItemsList() {
    if (this.state.categorySelected) {
      return (
        <MenuItemsList
          categoryID={this.state.selectedCategoryData.id}
          categoryName={this.state.selectedCategoryData.name}
        />
      );
    } else {
      return <Container />;
    }
  }

  render() {
    return (
      <Container>
        <Header as="h1">
          Speisekarte
          <Header.Subheader>Kategorien und Gerichte verwalten</Header.Subheader>
        </Header>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <CategoriesList
                activeCategoryID={this.state.selectedCategoryData.id}
                onCategorySelect={this.handleCategorySelected}
              />
            </Grid.Column>
            <Grid.Column width={12}>{this.renderMenuItemsList()}</Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default Menu;
