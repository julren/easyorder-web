import React from "react";
import { Table, Image, Rating, Button, List } from "semantic-ui-react";

const MenuItemsListItem = props => {
  const { name, price, rating, description, photo } = props.menuItemDoc.data();

  const { onDelete, onEdit } = props;

  return (
    <Table.Row>
      <Table.Cell collapsing>
        <Image src={photo} style={{ width: "50px" }} />
      </Table.Cell>
      <Table.Cell>
        <List.Header>
          <b>{name}</b>
        </List.Header>
        {description}
      </Table.Cell>
      <Table.Cell>{price}€</Table.Cell>
      <Table.Cell>
        <Rating rating={rating} maxRating={5} disabled />
      </Table.Cell>
      <Table.Cell collapsing textAlign="right">
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
      </Table.Cell>
    </Table.Row>
  );
};

export default MenuItemsListItem;
