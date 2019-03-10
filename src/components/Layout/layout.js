import React from "react";
import "./layout.css";
import { Grid, Container, Segment, Header } from "semantic-ui-react";

import HeaderNav from "./Navbar/navbar";
import Routes from "../../routes/routes";
import Main from "./Main/main";

const Layout = props => {
  return (
    <div
      style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}
    >
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16} verticalAlign="middle" color="blue">
              <Container className="brand-title">
                <h1>EasyOrder</h1>
              </Container>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ paddingTop: 0 }}>
            <Grid.Column width={16} verticalAlign="bottom">
              <HeaderNav {...props} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      <main style={{ flex: 1 }}>
        <Segment vertical style={{ padding: "2em 0em 10em 0em" }}>
          <Main>
            <Routes {...props} />
          </Main>
        </Segment>
      </main>
      <footer>
        <Segment inverted color="black" vertical style={{ padding: "2em 0em" }}>
          <Container>
            <Header as="h4" inverted>
              EasyOrder
            </Header>
            <p>Masterarbeit von Julius Renner an der HaW Landshut</p>
          </Container>
        </Segment>
      </footer>
    </div>
  );
};

export default Layout;
