import React from "react";
import { Link } from "react-router-dom";

import {
  Grid,
  Container,
  Header,
  Button,
  Icon,
  List,
  Image,
  Divider,
  Segment
} from "semantic-ui-react";
import "./landing.css";
const Landing = () => {
  return (
    <>
      <Segment
        inverted
        color="blue"
        inverted
        textAlign="center"
        style={{ paddingTop: "150px", paddingBottom: "150px" }}
        vertical
      >
        <Container>
          <Header
            className="brand-title"
            as="h1"
            content="EasyOrder"
            inverted
            style={{
              fontSize: "5em",
              fontWeight: "normal",
              marginBottom: 0
            }}
          />
          <Header
            as="h2"
            content="Restaurantbestellungen so einfach wie nie"
            inverted
            style={{
              fontSize: "1.7em",
              fontWeight: "normal",
              marginTop: "1.5em"
            }}
          />
          <div style={{ paddingTop: "30px" }}>
            <Button primary basic inverted size="huge" as={Link} to="/signup">
              Registrieren
            </Button>
            <Button primary basic inverted size="huge" as={Link} to="/login">
              Login
            </Button>
          </div>
        </Container>
      </Segment>
      <Container>
        <Segment style={{ padding: "6em 0em" }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={6}>
                <Image
                  rounded
                  size="medium"
                  src={require("./images/appscreenshot.png")}
                />
              </Grid.Column>
              <Grid.Column width={8} floated="right">
                <Header as="h3" style={{ fontSize: "2em" }}>
                  Bestellen Sie Ihre Lieblingsgerichte komfortabel über Ihr
                  Smartphone! 😍
                </Header>
                <p style={{ fontSize: "1.33em" }}>
                  Nutzen Sie die EasyOrder-App für iOS & Android, um in Ihrem
                  Lieblingsrestaurant Ihre Bestellung aufzugeben und genießen
                  Sie viele Vorteile.
                </p>

                <Button size="huge" primary>
                  Jetzt die App downloaden
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Segment style={{ padding: "6em 0em" }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={6}>
                <Header as="h3" style={{ fontSize: "2em" }}>
                  Für Restaurantbetreiber: Bieten Sie Ihren Kunden ein
                  einmaliges Erlebnis! 🤓
                </Header>
                <p style={{ fontSize: "1.33em" }}>
                  EasyOrder hilft Ihnen dabei Ihren Umsatz zu steigern und Ihre
                  Kunden glücklich zu machen.
                </p>

                <Button size="huge" primary>
                  Jetzt ihr Restaurant registrieren
                </Button>
              </Grid.Column>

              <Grid.Column floated="right" width={8}>
                <Image
                  rounded
                  size="huge"
                  src={require("./images/webscreenshot.png")}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Segment style={{ padding: "0em" }} vertical>
          <Grid celled="internally" columns="equal" stackable>
            <Grid.Row
              textAlign="center"
              style={{ paddingTop: "20px", paddingBottom: "20px" }}
            >
              <Grid.Column>
                <Header as="h1">😃</Header>
                <Header as="h3" style={{ fontSize: "2em" }}>
                  "Ein großartiges Erlebnis!"
                </Header>
                <p style={{ fontSize: "1.33em" }}>Unsere Gäste lieben es!</p>
              </Grid.Column>
              <Grid.Column>
                <Header as="h1">🎉</Header>
                <Header as="h3" style={{ fontSize: "2em" }}>
                  "34% mehr Umsatz dank EasyOrder"
                </Header>
                <p style={{ fontSize: "1.33em" }}>
                  <b>Peter Meier</b> - La Dolce Vita Landshut
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>

      <Segment inverted vertical style={{ padding: "5em 0em" }}>
        <Container>
          <Grid divided inverted stackable>
            <Grid.Row>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="About" />
                <List link inverted>
                  <List.Item as="a">Login</List.Item>
                  <List.Item as="a">Signup</List.Item>
                  <List.Item as="a">Impressum</List.Item>
                  <List.Item as="a">Datenschutz</List.Item>
                </List>
              </Grid.Column>

              <Grid.Column width={7}>
                <Header as="h4" inverted>
                  EasyOrder
                </Header>
                <p>Julius Renner, Masterarbeit HaW Landshut</p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    </>
  );
};

export default Landing;
