import React, { Component } from "react";
import { db, firebase, firebaseRestaurants } from "../config/firebase";

const RestaurantContext = React.createContext("restaurant");
const RestaurantContextConsumer = RestaurantContext.Consumer;

class RestaurantContextWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      user: undefined,
      orderDocs: [],
      inProgressOrdersDocs: [],
      readyForServingOrdersDocs: [],
      restaurantDoc: undefined
    };
  }

  clearRestaurantID = () => {
    this.setState({ restaurantID: "" });
  };

  getMenuSections = restaurantDoc => {
    restaurantDoc
      .collection("menuSections")
      .get()
      .then(querySnapshot => {
        return querySnapshot.docs;
      });
  };

  getMenuItems = menuSectionDoc => {
    menuSectionDoc.ref
      .collection("menuItems")
      .get()
      .then(querySnapshot => {
        return querySnapshot.docs;
      });
  };

  getRestaurantForUser = async () => {
    console.log(
      "getRestaurantForUser for UID: ",
      firebase.auth().currentUser.uid
    );
    return db
      .collection("restaurants")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(async doc => {
        if (!doc.exists) {
          console.log(
            "No restaurants found for for uid",
            firebase.auth().currentUser.uid,
            " - initializing it."
          );

          return this.initializeRestaurant().then(() => {
            return this.getRestaurantForUser();
          });
        } else {
          console.log("found restaurant", doc.data());
          return doc;
        }
      });
  };

  setUpOrderListener = () => {
    db.collection("orders")
      .where("restaurant.restaurantID", "==", firebase.auth().currentUser.uid)
      .onSnapshot(querySnapshot => {
        if (querySnapshot.empty) {
          console.log(
            "No orders for restaurantID ",
            firebase.auth().currentUser.uid
          );
        } else {
          this.setState({
            orderDocs: querySnapshot.docs
          });
        }
      });
  };

  initializeRestaurant = async () => {
    await firebaseRestaurants
      .doc(firebase.auth().currentUser.uid)
      .set(placeholderRestaurantValues)
      .then(() => {
        console.log("Restaurant Document initialized");
      })
      .catch(function(error) {
        console.error("Error adding initializing document: ", error);
      });
  };

  async componentDidMount() {
    console.log("Contetx componentDidMount");
    await firebase.auth().onAuthStateChanged(async user => {
      console.log("Contetx onAuthStateChanged", user);

      let restaurantDoc = undefined;

      if (user) {
        console.log("getting restaurantDoc");
        restaurantDoc = await this.getRestaurantForUser();
        this.setUpOrderListener();
      }

      this.setState({
        user: user,
        restaurantDoc: restaurantDoc,
        loading: false
      });
    });
  }

  render() {
    return (
      <RestaurantContext.Provider value={this.state}>
        {this.props.children}
      </RestaurantContext.Provider>
    );
  }
}
export { RestaurantContext, RestaurantContextConsumer };
export default RestaurantContextWrapper;

const placeholderRestaurantValues = {
  name: "",
  description: "",
  cuisine: "",
  priceClass: "",
  address: {
    street: "",
    postcode: "",
    city: "",
    lat: "",
    lon: ""
  },
  contactInfo: {
    email: "",
    phone: ""
  },
  businessHours: [
    {
      day: "",
      openingHour: "",
      closingHour: ""
    }
  ],
  media: {
    coverPhoto: "",
    logo: ""
  }
};
