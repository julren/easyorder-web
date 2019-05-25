import React, { Component } from "react";
import { Table, Image, Rating, Button, Header } from "semantic-ui-react";

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
    const { onDelete, onEdit, onShowReviews } = this.props;
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
          onClick={() => {
            this.setState({ hovering: false });
            onEdit();
          }}
        />
        <Button
          compact
          basic
          type="button"
          color="red"
          icon="trash"
          onClick={() => {
            this.setState({ hovering: false });
            onDelete();
          }}
        />
      </React.Fragment>
    );

    return (
      <Table.Row
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Table.Cell collapsing>
          <Image src={photo} size="mini" />
        </Table.Cell>
        <Table.Cell>
          <Header as="h4" image>
            <Header.Content>
              <b>{name}</b>
              <Header.Subheader> {description}</Header.Subheader>
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>{parseFloat(price).toFixed(2)}€</Table.Cell>
        <Table.Cell
          onClick={() => {
            this.setState({ hovering: false });
            onShowReviews();
          }}
        >
          <Rating
            icon="star"
            rating={rating ? rating.avgRating : 0}
            maxRating={5}
            disabled
          />
        </Table.Cell>
        <Table.Cell textAlign="right" width={2}>
          {this.state.hovering ? <EditButtons /> : null}
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default MenuItemsListItem;
