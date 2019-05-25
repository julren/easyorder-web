import React, { Component } from "react";
import { Container, Header, Image } from "semantic-ui-react";
import { db } from "../../config/firebase";

class Home extends Component {
  componentDidMount() {
    db.collection("restastaurants")
      .doc("WTpxRrjqspaedb8EnBTMRO1KVDM2")
      .collection("menuItems")
      .doc("7lSmww1LjR8oCMQmUOUm")
      .get()
      .then(doc => console.log(doc));
  }

  render() {
    return (
      <Container>
        <Header as="h1">
          Willkommen bei Easy Order
          <Header.Subheader>
            Zeitgemäße Gastronomie für Ihr Unternehmen
          </Header.Subheader>
        </Header>
        <Image
          fluid
          src={require("../../assets/images/home-restaurant-banner.jpg")}
        />
      </Container>
    );
  }
}

export default Home;
