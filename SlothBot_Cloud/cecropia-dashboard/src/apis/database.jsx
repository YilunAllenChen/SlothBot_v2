
import firebase from "firebase/app";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCGiPWGUd_6q5FvGy908P91AT3i7pyslHI",
  authDomain: "cecropia.firebaseapp.com",
  databaseURL: "https://cecropia-default-rtdb.firebaseio.com",
  projectId: "cecropia",
  storageBucket: "cecropia.appspot.com",
  messagingSenderId: "582360457051",
  appId: "1:582360457051:web:d75e356ec9e83ef306c47e",
  measurementId: "G-QXFS18M5T5",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const DBRef = firebase.firestore().collection("slothbots");

export default DBRef;