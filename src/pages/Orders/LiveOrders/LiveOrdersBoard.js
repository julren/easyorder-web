import React, { Component } from "react";
import {
  Grid,
  Header,
  Container,
  Card,
  Segment,
  Loader
} from "semantic-ui-react";
import { firebase, db } from "../../../config/firebase";
import OrderCard from "./OrderCard";

class LiveOrdersBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openOrdersDocs: [],
      inProgressOrdersDocs: [],
      readyForServingOrdersDocs: [],
      loading: true
    };
  }

  setUpDBListener = () => {
    db.collection("orders")
      .where("restaurant.restaurantID", "==", firebase.auth().currentUser.uid)
      .orderBy("orderDate")
      .onSnapshot(querySnapshot => {
        if (querySnapshot.empty) {
          console.log(
            "No orders for restaurantID ",
            firebase.auth().currentUser.uid
          );
        } else {
          let openOrdersDocs = [];
          let inProgressOrdersDocs = [];
          let readyForServingOrdersDocs = [];

          querySnapshot.forEach(doc => {
            switch (doc.data().status) {
              case "open":
                openOrdersDocs.push(doc);
                break;
              case "inProgress":
                inProgressOrdersDocs.push(doc);
                break;
              case "readyForServing":
                readyForServingOrdersDocs.push(doc);
                break;
              default:
                console.log("unkown status of order: ", doc.uid);
            }
          });

          console.log("db get done");
          this.setState({
            openOrdersDocs: openOrdersDocs,
            inProgressOrdersDocs: inProgressOrdersDocs,
            readyForServingOrdersDocs: readyForServingOrdersDocs,
            loading: false
          });
        }
      });
  };

  componentDidMount() {
    this.setUpDBListener();
  }

  componentWillUnmount() {
    db.collection("orders")
      .where("restaurant.restaurantID", "==", firebase.auth().currentUser.uid)
      .onSnapshot(() => {});
  }

  render() {
    const { openOrdersDocs, loading } = this.state;
    if (loading) return <Loader size="big" active inline="centered" />;

    return (
      <Grid columns={3} verticalAlign="top">
        <Grid.Row>
          <Grid.Column>
            <Segment inverted color="blue">
              <Header as="h2" content="Neu" />
            </Segment>

            {openOrdersDocs.length > 0 ? (
              <Card.Group>
                {openOrdersDocs.map((orderDoc, index) => (
                  <OrderCard key={orderDoc.id} orderDoc={orderDoc} />
                ))}
              </Card.Group>
            ) : (
              <p>Keine Bestellungen</p>
            )}
          </Grid.Column>
          <Grid.Column>
            <Segment inverted color="yellow">
              <Header as="h2" content="In Bearbeitung" />
            </Segment>

            {this.state.inProgressOrdersDocs.length > 0 ? (
              <Card.Group>
                {this.state.inProgressOrdersDocs.map((orderDoc, index) => (
                  <OrderCard key={orderDoc.id} orderDoc={orderDoc} />
                ))}
              </Card.Group>
            ) : (
              <p>Keine Bestellungen</p>
            )}
          </Grid.Column>
          <Grid.Column>
            <Segment inverted color="green">
              <Header as="h2" content="Servierbereit" />
            </Segment>

            {this.state.readyForServingOrdersDocs.length > 0 ? (
              <Card.Group>
                {this.state.readyForServingOrdersDocs.map((orderDoc, index) => (
                  <OrderCard key={orderDoc.id} orderDoc={orderDoc} />
                ))}
              </Card.Group>
            ) : (
              <p>Keine Bestellungen</p>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default LiveOrdersBoard;
