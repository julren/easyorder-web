import firebase from "firebase";

const config = {
  //Firebase Config Data
};

firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();
const storage = firebase.storage();

const firebaseRestaurants = db.collection("restaurants");

const firebaseOrders = db.collection("orders");
const fireBaseTables = db.collection("tables");

const firebaseRestaurantReviews = db.collection("restaurantReviews");
const firebaseMenuItemReviews = db.collection("menuItemReviews");

export {
  firebase,
  db,
  storage,
  firebaseRestaurants,
  firebaseOrders,
  fireBaseTables,
  firebaseRestaurantReviews,
  firebaseMenuItemReviews
};
