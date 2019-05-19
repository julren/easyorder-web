import React, { Component } from "react";
import { Container, Header } from "semantic-ui-react";
import { db } from "../../config/firebase";

class Home extends Component {
  test = [
    {
      name: "Salat",
      description: "Mit Tomaten, Essig und Öl",
      rating: 4,
      price: 8,
      photoURL: "https://images.lecker.de/,id=8b9be707,b=lecker,w=610,cg=c.jpg"
    },
    {
      name: "Salat",
      description: "Mit Tomaten, Essig und Öl",
      rating: 4,
      price: 8,
      photoURL: "https://images.lecker.de/,id=8b9be707,b=lecker,w=610,cg=c.jpg"
    },
    {
      name: "Salat",
      description: "Mit Tomaten, Essig und Öl",
      rating: 4,
      price: 8,
      photoURL: "https://images.lecker.de/,id=8b9be707,b=lecker,w=610,cg=c.jpg"
    }
  ];

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
        <Header as="h1" content="Willkommen bei Easy Order" />
      </Container>
    );
  }
}

export default Home;
