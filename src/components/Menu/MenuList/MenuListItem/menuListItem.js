import React from "react";
import { List, Image, Segment } from "semantic-ui-react";
import {
  Button,
  Checkbox,
  Dropdown,
  Form,
  Input,
  TextArea
} from "formik-semantic-ui";
import * as Yup from "yup";

class MenuItem extends React.Component {
  constructor(props) {
    super(props);
  }

  renderListItems = props => {
    return (
      <List.Item>
        <List.Content floated="right" />
        <List.Content floated="right">
          <Form.Group widths="2">
            <Input
              label="First Name"
              name={`${props.menuSection}[${props.index}].name`}
            />
            <Input label="Last Name" name="lastName" />
          </Form.Group>
        </List.Content>
        <Image
          avatar
          src="https://react.semantic-ui.com/images/avatar/small/lena.png"
        />
        <List.Content>{props.item.name}</List.Content>
      </List.Item>
    );
  };

  render() {
    return <React.Fragment>{this.renderListItems(this.props)}</React.Fragment>;
  }
}

export default MenuItem;
