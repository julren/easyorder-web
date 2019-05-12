import React, { Component } from "react";
import {
  Header,
  Container,
  Grid,
  Segment,
  Icon,
  Button
} from "semantic-ui-react";
import { db, firebase } from "../../config/firebase";
import { withRestaurantContext } from "../../contexts/withRestaurantContext";
import WithLoadingSpinner from "../../components/WithLoadingSpinner";
import MenuSectionsList from "./MenuSectionsList";
import MenuSectionDetail from "./menuSectionDetail/MenuSectionDetail";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      selectedMenuSectionDoc: undefined,
      menuSectionDocs: []
    };
  }
  componentDidMount() {
    this.getMenuSections();
  }

  getMenuSections = () => {
    db.collection("restaurants")
      .doc(firebase.auth().currentUser.uid)
      .collection("menuSections")
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) {
          console.log("No MenuSections");
          this.setState({ loading: false, menuSectionDocs: [] });
        } else {
          console.log(querySnapshot.docs);
          this.setState(prevState => ({
            loading: false,
            menuSectionDocs: querySnapshot.docs,
            selectedMenuSectionDoc: prevState.selectedMenuSectionDoc
              ? prevState.selectedMenuSectionDoc
              : querySnapshot.docs[0]
          }));
        }
      })
      .catch(error => {
        console.error("Error getting document: ", error);
      });
  };

  onSelectMenuSection = menuSectionDoc => {
    this.setState({
      selectedMenuSectionDoc: menuSectionDoc
    });
  };

  render() {
    const { menuSectionDocs, selectedMenuSectionDoc, loading } = this.state;

    return (
      <Container>
        <Header as="h1">
          Speisekarte
          <Header.Subheader>Kategorien und Gerichte verwalten</Header.Subheader>
        </Header>

        <WithLoadingSpinner loading={loading}>
          <Grid>
            <Grid.Column width={4}>
              <MenuSectionsList
                menuSectionDocs={menuSectionDocs}
                selectedMenuSectionDoc={selectedMenuSectionDoc}
                onSelectMenuSection={this.onSelectMenuSection}
                onDataChange={this.getMenuSections}
              />
            </Grid.Column>

            {selectedMenuSectionDoc && (
              <Grid.Column stretched width={12}>
                <MenuSectionDetail
                  menuSectionDocs={menuSectionDocs}
                  selectedMenuSectionDoc={selectedMenuSectionDoc}
                  onDataChange={this.getMenuSections}
                />
              </Grid.Column>
            )}
          </Grid>
        </WithLoadingSpinner>
      </Container>
    );
  }
}

export default withRestaurantContext(Menu);
