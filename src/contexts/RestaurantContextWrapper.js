import React, { Component } from "react";
import { db, firebase } from "../config/firebase";

const RestaurantContext = React.createContext("restaurant");

class RestaurantContextWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurantID: "",
      setRestaurantId: this.setRestaurantId,
      clearRestaurantId: this.clearRestaurantId
    };
  }

  setRestaurantID = restaurantID => {
    this.setState({ restaurantID });
  };

  clearRestaurantID = () => {
    this.setState({ restaurantID: "" });
  };

  getRestaurantForUser = async () => {
    await db
      .collection("restaurants")
      .where("authorID", "==", firebase.auth().currentUser.uid)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) {
          console.log(
            "No restaurants for user uid yet",
            firebase.auth().currentUser.uid
          );
          return;
        } else {
          let docs = [];
          querySnapshot.forEach(doc => {
            docs.push(doc);
          });

          console.log("Found restaurant: " + docs[0].id);

          this.setRestaurantID(docs[0].id);
          return;
        }
      })
      .catch(error => {
        console.error("Error getting document: ", error);
      });
  };

  componentDidMount() {
    this.getRestaurantForUser();
  }

  render() {
    return (
      <RestaurantContext.Provider value={this.state}>
        {this.props.children}
      </RestaurantContext.Provider>
    );
  }
}
export { RestaurantContext };
export default RestaurantContextWrapper;
