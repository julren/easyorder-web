import React, { Component } from "react";
import "./layout.css";
import { Grid } from "semantic-ui-react";

import HeaderNav from "./Navbar/navbar";
import Routes from "../../routes/routes";
import Main from "./Main/main";

const Layout = props => {
  return (
    <>
      <Grid>
        <Grid.Row>
          <Grid.Column width={16} verticalAlign="middle">
            <div className="brand-title">
              <h1>EasyOrder</h1>
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16} verticalAlign="bottom">
            <HeaderNav {...props} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid padded>
        <Grid.Row>
          <Grid.Column width={16}>
            <Main>
              <Routes {...props} />
            </Main>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default Layout;
