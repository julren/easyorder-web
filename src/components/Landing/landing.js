import React from "react";
import Login from "../Login/login";
import SignUp from "../Signup/signup";
import { Grid, Container } from "semantic-ui-react";

const Landing = () => {
  return (
    <>
      <Grid columns={1} padded>
        <Grid.Row>
          <Grid.Column verticalAlign="middle">
            <div className="brand-title">
              <h1>Easy Order</h1>
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Container>
              <Login />
              <SignUp />
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default Landing;
