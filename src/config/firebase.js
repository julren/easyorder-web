import firebase from "firebase";

const config = {
  apiKey: "***REMOVED***",
  authDomain: "***REMOVED***",
  databaseURL: "***REMOVED***",
  projectId: "***REMOVED***",
  storageBucket: "***REMOVED***",
  messagingSenderId: "***REMOVED***"
};

firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();
const storage = firebase.storage();
// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

const firebaseRestaurants = db.collection("restaurants");
const firebaseCategories = db.collection("categories");
const firebaseMenuItems = db.collection("menuItems");
const firebaseOrders = db.collection("orders");

export {
  firebase,
  db,
  storage,
  firebaseRestaurants,
  firebaseMenuItems,
  firebaseOrders,
  firebaseCategories
};
