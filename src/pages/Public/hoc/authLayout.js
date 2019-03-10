import React from "react";
import { Grid, Segment, Header } from "semantic-ui-react";
const AuthLayout = props => {
  return (
    <Grid textAlign="center" style={{ height: "100%" }} verticalAlign="middle">
      <Grid.Row style={{ backgroundColor: "#2185d0" }}>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header
            as="h1"
            style={{
              fontSize: "48px",
              fontFamily: "Pacifico, cursive",
              color: "white"
            }}
          >
            {/* <Image src='/logo.png' /> */}
            EasyOrder
          </Header>
          <Segment textAlign="left">{props.children}</Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default AuthLayout;
