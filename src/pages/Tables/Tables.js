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
import TablesTable from "./tablesTable/TablesTable";
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
    this.setState({ loading: true });
    console.log("getTables");
    db.collection("restaurants")
      .doc(firebase.auth().currentUser.uid)
      .collection("tables")
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) {
          console.log(
            "No tables for restaurantID ",
            firebase.auth().currentUser.uid
          );
          this.setState({
            loading: false
          });
        } else {
          this.setState({
            tableDocs: querySnapshot.docs,
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
        <Segment basic loading={loading}>
          <Header as="h1">
            Tische
            <Header.Subheader>
              Tische und anlegen, verwalten und Tisch-Codes generieren
            </Header.Subheader>
          </Header>

          <TablesTable tableDocs={tableDocs} onDataChange={this.getTables} />

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
        </Segment>
      </Container>
    );
  }
}

export default Tables;
