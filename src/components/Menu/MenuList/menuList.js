import React from "react";
import { List, Image, Segment, Header } from "semantic-ui-react";
import { Form, Button, Input, Dropdown } from "formik-semantic-ui";

import MenuListItem from "./MenuListItem/menuListItem";

const renderMenuList = props => {
  let template = "";

  for (let menuSection in props.menu) {
    console.log(menuSection, props.menu[menuSection]);

    const items = props.menu[menuSection].map((item, index) => {
      return (
        <MenuListItem
          menuSection={menuSection}
          item={item}
          key={index}
          index={index}
          onChange={props.onChange}
        />
      );
    });

    template = (
      <Form
        initialValues={{
          menu: {
            section: []
          }
        }}
        render={() => (
          <Form.Children>
            <Header as="h4">{menuSection}</Header>
            <List divided verticalAlign="middle">
              {items}
            </List>
          </Form.Children>
        )}
      />
    );
  }

  return template;
};

const MenuList = props => {
  return <React.Fragment>{renderMenuList(props)}</React.Fragment>;
};

export default MenuList;
