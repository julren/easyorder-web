import React, { Component } from "react";
import {
  Container,
  Header,
  Segment,
  List,
  Button,
  Rating,
  Image
} from "semantic-ui-react";
import MenuItemForm from "../Menu/menuItemsList/Modals/menuItemForm";

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

  render() {
    return (
      <Container>
        <Header as="h1" content="Willkommen bei Easy Order" />
      </Container>
    );
  }
}

export default Home;
