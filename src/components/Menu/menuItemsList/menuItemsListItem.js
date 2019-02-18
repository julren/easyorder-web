import React, { Component } from "react";
import { Table, Image, Rating, Button, List } from "semantic-ui-react";

class MenuItemsListItem extends Component {
  state = { hovering: false };

  render() {
    const {
      name,
      price,
      rating,
      description,
      photo
    } = this.props.menuItemDoc.data();
    const { onDelete, onEdit } = this.props;
    const handleMouseEnter = () => this.setState({ hovering: true });
    const handleMouseLeave = () => this.setState({ hovering: false });

    const EditButtons = () => (
      <React.Fragment>
        <Button
          compact
          basic
          type="button"
          color="blue"
          icon="pencil"
          onClick={onEdit}
        />
        <Button
          compact
          basic
          type="button"
          color="red"
          icon="trash"
          onClick={onDelete}
        />
      </React.Fragment>
    );

    return (
      <Table.Row
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Table.Cell collapsing>
          <Image src={photo} style={{ width: "50px" }} />
        </Table.Cell>
        <Table.Cell>
          <List.Header>
            <b>{name}</b>
            {description}
          </List.Header>
        </Table.Cell>
        <Table.Cell>{price}€</Table.Cell>
        <Table.Cell>
          <Rating rating={rating} maxRating={5} disabled />
        </Table.Cell>
        <Table.Cell collapsing textAlign="right">
          {this.state.hovering ? <EditButtons /> : null}
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default MenuItemsListItem;
