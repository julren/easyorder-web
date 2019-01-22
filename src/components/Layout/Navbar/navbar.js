import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { Menu, Segment, Icon, Container } from "semantic-ui-react";

import { firebase } from "../../../config/firebase";

class HeaderNav extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: "", auth: props.auth ? true : false };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  logout = () => {
    firebase.auth().signOut();
  };

  render() {
    const { activeItem } = this.state;

    return (
      <div className="navbar">
        <Menu color="blue" inverted>
          <Container>
            <Menu.Item
              name="home"
              active={activeItem === "home"}
              onClick={this.handleItemClick}
              as={Link}
              to="/"
            >
              <Icon name="home" />
              Home
            </Menu.Item>

            <Menu.Item
              name="restaurant"
              active={activeItem === "restaurant"}
              onClick={this.handleItemClick}
              as={Link}
              to="/restaurant"
            >
              <Icon name="food" />
              Restaurant
            </Menu.Item>

            <Menu.Item
              name="menu"
              active={activeItem === "menu"}
              onClick={this.handleItemClick}
              as={Link}
              to="/menu"
            >
              <Icon name="list" />
              Speisekarte
            </Menu.Item>

            <Menu.Item
              name="report"
              active={activeItem === "report"}
              onClick={this.handleItemClick}
              as={Link}
              to="/report"
            >
              <Icon name="chart line" />
              Auswertungen
            </Menu.Item>

            <Menu.Item
              name="orders"
              active={activeItem === "orders"}
              onClick={this.handleItemClick}
              as={Link}
              to="/orders"
            >
              <Icon name="cart" />
              Bestellungen
            </Menu.Item>

            <Menu.Item
              name="account"
              active={activeItem === "account"}
              onClick={this.handleItemClick}
              as={Link}
              to="/account"
            >
              <Icon name="user" />
              Account
            </Menu.Item>

            {/* <Menu.Item
            name="login"
            active={activeItem === "login"}
            onClick={this.handleItemClick}
            as={Link}
            to="/login"
          >
            Login
          </Menu.Item>

          <Menu.Item
            name="signup"
            active={activeItem === "signup"}
            onClick={this.handleItemClick}
            as={Link}
            to="/signup"
          >
            Signup
          </Menu.Item> */}

            <Menu.Item
              name="signup"
              to="/"
              as={Link}
              onClick={this.logout}
              position="right"
            >
              <Icon name="sign-out" />
              Logout
            </Menu.Item>
          </Container>
        </Menu>
      </div>
    );
  }
}

export default HeaderNav;
