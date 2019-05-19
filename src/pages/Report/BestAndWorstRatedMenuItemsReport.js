import React, { Component } from "react";
import {
  Segment,
  Statistic,
  Header,
  List,
  Image,
  Rating
} from "semantic-ui-react";
import { firebase, firebaseRestaurants } from "../../config/firebase";
import { withRestaurantContext } from "../../contexts/withRestaurantContext";
import _ from "lodash";

class BestAndWorstRatedMenuItemsReport extends Component {
  constructor(props) {
    super(props);
    this.state = { sortedMenuItems: [] };
  }

  getMenuItems = async () => {
    // let menu = {};
    let menuItems = [];

    const menuSectionsRef = await firebaseRestaurants
      .doc(firebase.auth().currentUser.uid)
      .collection("menuSections")
      .get();

    for (let menuSectionDoc of menuSectionsRef.docs) {
      const menuItemsRef = await menuSectionDoc.ref
        .collection("menuItems")
        .get();

      for (let menuItemDoc of menuItemsRef.docs) {
        menuItems.push(menuItemDoc.data());
      }
      // menu[menuSectionDoc.data().name] = menuItemsData;
    }

    console.log("menu", menuItems);

    const sortedMenuItems = menuItems.sort((a, b) => {
      return a.avgRating > b.avgRating;
    });

    this.setState({ sortedMenuItems: sortedMenuItems });
  };

  componentDidMount() {
    this.getMenuItems();
  }

  render() {
    const { sortedMenuItems } = this.state;
    return (
      <Segment.Group>
        <Segment color="blue" inverted>
          <Header as="h2">📈 Top & Flop Gerichte</Header>
        </Segment>

        <Segment.Group horizontal>
          <Segment>
            <Header as="h4">👍 Top</Header>

            <RankedMenuItemsList menuItems={sortedMenuItems.slice(0, 5)} />
          </Segment>
          <Segment>
            <Header as="h4">👎 Flop</Header>
            <RankedMenuItemsList
              menuItems={sortedMenuItems.slice(
                Math.max(sortedMenuItems.length - 5, 1)
              )}
            />
          </Segment>
        </Segment.Group>
      </Segment.Group>
    );
  }
}

export default withRestaurantContext(BestAndWorstRatedMenuItemsReport);

const RankedMenuItemsList = ({ menuItems }) => (
  <List ordered>
    {menuItems.map((menuItem, index) => {
      const { name, avgRating = 0, photoThumb } = menuItem;
      return (
        <List.Item key={index}>
          <Image avatar src={photoThumb} />
          <List.Content>
            <List.Header>{name}</List.Header>
            <Rating rating={avgRating} maxRating={5} disabled />
          </List.Content>
        </List.Item>
      );
    })}
  </List>
);
