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
        textAlign="center"
        style={{
          minHeight: 700,
          padding: "1em 0em"
          // backgroundImage: `url("https://toredco.com.vn/wp-content/uploads/2017/09/restaurant_1.jpg")`,
          // backgroundSize: "cover"
        }}
        vertical
      >
        <Container text>
          <Header
            className="brand-title"
            as="h1"
            content="EasyOrder"
            inverted
            style={{
              fontSize: "4em",
              fontWeight: "normal",
              marginBottom: 0,
              marginTop: "3em"
            }}
          />
          <Header
            as="h2"
            content="Modernes Bestellsystem für die Gastronomie"
            inverted
            style={{
              fontSize: "1.7em",
              fontWeight: "normal",
              marginTop: "1.5em"
            }}
          />
          <Button primary size="huge" as={Link} to="/signup">
            Registrieren
            <Icon name="right arrow" />
          </Button>
          <Button primary size="huge" as={Link} to="/login">
            Login
            <Icon name="right arrow" />
          </Button>
        </Container>
      </Segment>
      <Segment style={{ padding: "8em 0em" }} vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                Bestellen im Restaurant so einfach wie nie!
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                Bestellen Sie einfach per Smartphone im Restaurant und genießen
                Sie viele Vorteile.
              </p>
              <Header as="h3" style={{ fontSize: "2em" }}>
                Für Gastronomen: Effektive Bestellabwicklung
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                Personalbedarf reduzieren und Umsatz steigern.
              </p>
            </Grid.Column>
            <Grid.Column floated="right" width={6}>
              <Image
                bordered
                rounded
                size="large"
                src="https://toredco.com.vn/wp-content/uploads/2017/09/restaurant_1.jpg"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Button size="huge">Jetzt testen</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment style={{ padding: "0em" }} vertical>
        <Grid celled="internally" columns="equal" stackable>
          <Grid.Row textAlign="center">
            <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                "Großartiges Erlebnis!"
              </Header>
              <p style={{ fontSize: "1.33em" }}>Gäste lieben es!</p>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                "Wir konnten eine Umsatzsteigerung um 34% realisieren"
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                <b>Peter Meier</b> La Dolce Vita Landshut
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment style={{ padding: "8em 0em" }} vertical>
        <Container text>
          <Header as="h3" style={{ fontSize: "2em" }}>
            Easy Order - eine tolle Masterarbeit!
          </Header>
          <p style={{ fontSize: "1.33em" }}>Gutes Ergebnis und viel gelert</p>
          <Button as="a" size="large">
            Jetzt bewerten
          </Button>
        </Container>
      </Segment>
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
