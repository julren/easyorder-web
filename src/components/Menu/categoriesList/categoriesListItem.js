import React, { Component } from "react";
import { List, Button } from "semantic-ui-react";
class CategoriesListItem extends Component {
  state = { hovering: false };
  render() {
    const { onClick, onEdit, onDelete, active } = this.props;
    const { name, description } = this.props.item.data();
    const handleMouseEnter = () => this.setState({ hovering: true });
    const handleMouseLeave = () => this.setState({ hovering: false });

    const EditButtons = () => (
      <React.Fragment>
        <Button
          compact
          basic
          size="tiny"
          type="button"
          color="blue"
          icon="pencil"
          onClick={onEdit}
        />
        <Button
          compact
          basic
          size="tiny"
          type="button"
          color="red"
          icon="trash"
          onClick={onDelete}
        />
      </React.Fragment>
    );

    return (
      <List.Item
        active={active}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <List.Content floated="right">
          {this.state.hovering ? <EditButtons /> : null}
        </List.Content>
        <List.Content onClick={onClick}>
          <List.Header>{name}</List.Header>
          {description}
        </List.Content>
      </List.Item>
    );
  }
}

export default CategoriesListItem;
