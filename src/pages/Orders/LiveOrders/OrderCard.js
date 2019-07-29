import React, { Component } from "react";
import {
  Card,
  List,
  Header,
  Dropdown,
  Image,
  Button,
  Segment,
  Icon
} from "semantic-ui-react";
import moment from "moment";
import OrderDetailModal from "../components/OrderDetailModal";

class OrderCard extends Component {
  constructor(props) {
    super(props);
    this.state = { detailModalOpen: false };
  }
  render() {
    const { orderDoc } = this.props;

    const {
      grandTotal,
      items,
      mwst,
      orderDate,
      paymentMethod,
      table,
      status
    } = orderDoc.data();

    const orderedStatusOptions = [
      "open",
      "inProgress",
      "readyForServing",
      "archived"
    ];

    const colorsForStatus = {
      open: "blue",
      inProgress: "yellow",
      readyForServing: "green",
      archived: "grey"
    };

    const onAdvanceStatus = () => {
      const currentStatusIndex = orderedStatusOptions.indexOf(status);
      const newStatusIndex = currentStatusIndex + 1;

      orderDoc.ref
        .update({ status: orderedStatusOptions[newStatusIndex] })
        .then(function() {
          console.log("Document successfully updated!");
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    };

    const onRejectOrder = () => {
      orderDoc
        .update({ status: "rejected" })
        .then(function() {
          console.log("Document successfully updated!");
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    };

    const onReverseStatus = () => {
      const currentStatusIndex = orderedStatusOptions.indexOf(status);
      const newStatusIndex = currentStatusIndex - 1;

      orderDoc.ref
        .update({ status: orderedStatusOptions[newStatusIndex] })
        .then(function() {
          console.log("Document successfully updated!");
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    };

    return (
      <Card fluid>
        <Segment
          basic
          inverted
          color={colorsForStatus[status]}
          style={{ paddingTop: 6, paddingBottom: 6, margin: 0 }}
        >
          <List verticalAlign="middle" inverted>
            <List.Item>
              <List.Content floated="right">
                <Dropdown
                  style={{ color: "white", marginTop: 10 }}
                  icon="ellipsis horizontal"
                  className="icon"
                >
                  <Dropdown.Menu>
                    <Dropdown.Item
                      icon="info circle"
                      content="Details"
                      onClick={() => this.setState({ detailModalOpen: true })}
                    />
                    <Dropdown.Divider />

                    <Dropdown.Item
                      icon="backward"
                      content="Zurück"
                      onClick={() => onReverseStatus()}
                    />
                  </Dropdown.Menu>
                </Dropdown>
              </List.Content>
              <List.Content>
                <List.Header as="h3">
                  #{table ? table.name : "Tisch 2"}
                  <span style={{ marginLeft: 10 }}>
                    <Icon
                      name={
                        paymentMethod === "cash"
                          ? "money bill alternate outline"
                          : "paypal"
                      }
                    />
                  </span>
                </List.Header>
                <List.Description>
                  {moment(orderDate.toDate()).fromNow()}
                </List.Description>
              </List.Content>
            </List.Item>
          </List>
        </Segment>

        <Card.Content>
          <Card.Description>
            <List divided verticalAlign="middle">
              {items.map(element => (
                <List.Item key={element.item.id}>
                  <Image size="mini" src={element.item.photo} />
                  <List.Content>
                    <List.Content>
                      <List.Header>
                        {element.quantity}x {element.item.name}
                      </List.Header>
                      {element.comment ? (
                        <List.Description>
                          <Icon name="comment" />
                          {element.comment}
                        </List.Description>
                      ) : null}
                    </List.Content>
                  </List.Content>
                  <List.Content floated="right">
                    <span>
                      {parseFloat(
                        element.quantity * element.item.price
                      ).toFixed(2)}
                    </span>
                  </List.Content>
                </List.Item>
              ))}
              {/* <List.Item>
                        <List.Content floated="right">
                          <span>{parseFloat(grandTotal).toFixed(2)}</span>
                        </List.Content>
                      </List.Item> */}
            </List>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          {status === "open" && (
            <div className="ui two buttons">
              <Button
                basic
                compact
                color="green"
                onClick={() => onAdvanceStatus()}
              >
                Annehmen
              </Button>
              <Button basic compact color="red" onClick={() => onRejectOrder()}>
                Ablehnen
              </Button>
            </div>
          )}
          {status === "inProgress" && (
            <Button
              fluid
              basic
              compact
              color="yellow"
              onClick={() => onAdvanceStatus()}
            >
              Servierbereit
            </Button>
          )}

          {status === "readyForServing" && (
            <Button
              fluid
              basic
              compact
              color="green"
              onClick={() => onAdvanceStatus()}
            >
              Abschließen
            </Button>
          )}
        </Card.Content>
        <OrderDetailModal
          orderDoc={orderDoc}
          open={this.state.detailModalOpen}
          onClose={() => this.setState({ detailModalOpen: false })}
        />
      </Card>
    );
  }
}

export default OrderCard;
