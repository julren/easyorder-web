import React, { Component } from "react";
import {
  Container,
  Header,
  Grid,
  List,
  Button,
  Icon,
  Search,
  Input,
  Segment,
  Loader
} from "semantic-ui-react";
import TablesTable from "./TablesTable/TablesTable";
import CreateTableModal from "./CreateTableModal";
import { db, firebase } from "../../config/firebase";

class Tables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableDocs: [],
      createTableModalOpen: false,
      loading: true
    };
  }

  componentDidMount() {
    this.getTables();
  }

  getTables = () => {
    console.log("getTAbel");
    db.collection("tables")
      .where("restaurantID", "==", firebase.auth().currentUser.uid)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) {
          console.log(
            "No tables for restaurantID ",
            firebase.auth().currentUser.uid
          );
        } else {
          let tableDocs = [];
          querySnapshot.forEach(doc => {
            tableDocs.push(doc);
          });
          this.setState({
            tableDocs: tableDocs,
            loading: false
          });
        }
      });
  };

  onModalOpen = () => {
    this.setState({ createTableModalOpen: true });
  };
  onModalClose = () => {
    this.setState({ createTableModalOpen: false });
    this.getTables();
  };

  render() {
    const { loading, createTableModalOpen, tableDocs } = this.state;
    if (loading) return <Loader size="big" active inline="centered" />;

    return (
      <Container>
        <Header as="h1">
          Tische
          <Header.Subheader>
            Tische und anlegen, verwalten und Tisch-Codes generieren
          </Header.Subheader>
        </Header>

        <TablesTable tableDocs={tableDocs} />

        <Segment padded={false} clearing basic>
          <Button
            content="Tisch hinzufügen"
            icon="plus"
            primary
            onClick={this.onModalOpen}
            floated="right"
          />
        </Segment>

        <CreateTableModal
          open={createTableModalOpen}
          onClose={this.onModalClose}
        />
      </Container>
    );
  }
}

export default Tables;
