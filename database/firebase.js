import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {

  apiKey:               "AIzaSyCVsc-J6yC_ARU-NHWvd589ZOYp7MvgfkY",
  authDomain:           "uxpresstransport-c0a8c.firebaseapp.com",
  projectId:            "uxpresstransport-c0a8c",
  storageBucket:        "uxpresstransport-c0a8c.appspot.com",
  messagingSenderId:    "1080466750359",
  appId:                "1:1080466750359:web:2c46bd004a353fcadf22d2",
  
};

// Initialize Firebase
//   const app = initializeApp(firebaseConfig);
//   const db = firebase.firestore()

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//const db = firebase.firestore();

export const db = firebase.firestore();

// Initialize FireStore
//export const dbg = getFirestore(app);

export default {
  firebase,
  db,
};
