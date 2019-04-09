import React, { Component } from "react";
import {
  Header,
  Container,
  Grid,
  Menu as MenuNav,
  Segment,
  Loader,
  Button,
  Icon
} from "semantic-ui-react";
import CategoriesList from "./categoriesList";
import MenuItemsList from "./menuItemsList";
import { db, firebase } from "../../config/firebase";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      selectedCategoryDoc: undefined,
      categoryDocs: []
    };
  }
  componentDidMount() {
    this.getMenuCategories();
  }

  getMenuCategories = () => {
    db.collection("categories")
      .where("authorID", "==", firebase.auth().currentUser.uid)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) {
          console.log("No Categories for uid", firebase.auth().currentUser.uid);
        } else {
          let categoryDocs = [];
          querySnapshot.forEach(doc => {
            categoryDocs.push(doc);
          });

          this.setState({
            loading: false,
            categoryDocs: categoryDocs,
            selectedCategoryDoc: categoryDocs[0]
          });
        }
      })
      .catch(error => {
        console.error("Error getting document: ", error);
      });
  };

  onSelectCategory = categoryDoc => {
    this.setState({
      selectedCategoryDoc: categoryDoc
    });
  };

  onOpenCreateCategoryModal = () => {};

  // renderMenuItemsList() {
  //   return (
  //     <MenuItemsList
  //       categoryID={this.state.selectedCategoryData.id}
  //       categoryName={this.state.selectedCategoryData.data().name}
  //     />
  //   );
  // }

  render() {
    const { categoryDocs, selectedCategoryDoc, loading } = this.state;

    if (loading) return <Loader size="big" active inline="centered" />;

    return (
      <Container>
        <Header as="h1">
          Speisekarte
          <Header.Subheader>Kategorien und Gerichte verwalten</Header.Subheader>
        </Header>

        <Grid>
          <Grid.Column width={4}>
            <MenuNav fluid vertical tabular>
              {categoryDocs.map(categoryDoc => (
                <MenuNav.Item
                  key={categoryDoc.id}
                  name={categoryDoc.data().name}
                  active={selectedCategoryDoc.id === categoryDoc.id}
                  onClick={() => this.onSelectCategory(categoryDoc)}
                />
              ))}
            </MenuNav>

            <Button
              primary
              icon="plus"
              content="Kategorie hinzufügen"
              onClick={this.onOpenCreateCategoryModal}
            />
          </Grid.Column>

          <Grid.Column stretched width={12}>
            <Segment attached="top" color="blue" inverted>
              <Header
                content={selectedCategoryDoc.data().name}
                floated="left"
              />
              <Icon name="trash alternate outline" />
            </Segment>

            <Segment attached basic>
              <MenuItemsList categoryID={selectedCategoryDoc.id} />
            </Segment>
          </Grid.Column>
        </Grid>

        {/* <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <MenuNav>
                {categoryDocs.map(categoryDoc => {
                  const { name } = categoryDoc.data();
                  const id = categoryDoc.id;
                  const { activeCategoryId } = this.state;

                  return (
                    <MenuNav.Item
                      name={name}
                      active={activeCategoryId === id}
                      onClick={categoryDoc =>
                        this.onSelectCategory(categoryDoc)
                      }
                    />
                  );
                })}
              </MenuNav>

              <CategoriesList onCategorySelect={this.onSelectCategory} />
            </Grid.Column>
            <Grid.Column width={12}>{this.renderMenuItemsList()}</Grid.Column>
          </Grid.Row>
        </Grid> */}
      </Container>
    );
  }
}

export default Menu;
