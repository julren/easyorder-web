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

const firebaseOrders = db.collection("orders");
const fireBaseTables = db.collection("tables");

export {
  firebase,
  db,
  storage,
  firebaseRestaurants,
  firebaseOrders,
  fireBaseTables
};
