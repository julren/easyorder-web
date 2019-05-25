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
    this.state = { rankedMenuItems: [], loading: true };
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

    const menuItemsWithRating = menuItems.filter(menuItem => {
      return menuItem.rating && menuItem.rating.totalNumRatings > 0;
    });

    const rankedMenuItems = menuItemsWithRating.sort((a, b) => {
      return a.rating.avgRating < b.rating.avgRating;
    });

    this.setState({ rankedMenuItems: rankedMenuItems, loading: false });
  };

  componentDidMount() {
    this.getMenuItems();
  }

  render() {
    const { rankedMenuItems, loading } = this.state;
    const bestMenuItems = rankedMenuItems.slice(0, 5);
    const worstMenuItems =
      rankedMenuItems.length <= 5
        ? []
        : rankedMenuItems
            .slice(Math.max(rankedMenuItems.length - 5, 1))
            .reverse();

    return (
      <Segment.Group>
        <Segment color="blue" inverted>
          <Header as="h2">📈 Top & Flop Gerichte</Header>
        </Segment>

        <Segment.Group horizontal>
          <Segment loading={loading} style={{ flex: 1 }}>
            <Header as="h4">👍 Top</Header>

            <RankedMenuItemsList menuItems={bestMenuItems} />
          </Segment>
          <Segment loading={loading} style={{ flex: 1 }}>
            <Header as="h4">👎 Flop</Header>
            <RankedMenuItemsList menuItems={worstMenuItems} />
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
      const { name, rating = 0, photo } = menuItem;
      return (
        <List.Item key={index}>
          <Image avatar src={photo} />
          <List.Content>
            <List.Header>{name}</List.Header>
            <>
              <Rating
                rating={rating.avgRating}
                maxRating={5}
                disabled
                icon="star"
              />
              <span style={{ color: "rgba(0,0,0,.4)", fontSize: 12 }}>
                ({rating.totalNumRatings})
              </span>
            </>
          </List.Content>
        </List.Item>
      );
    })}
  </List>
);
