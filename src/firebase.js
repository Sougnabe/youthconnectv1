// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCrlcbu3EjRFYBD2BWADoYOH7evMyop6s4",
  authDomain: "youthconnect-eb2a2.firebaseapp.com",
  projectId: "youthconnect-eb2a2",
  storageBucket: "youthconnect-eb2a2.appspot.com",
  messagingSenderId: "654545478437",
  appId: "1:654545478437:web:eed17231099d6a98c7f0cc"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Exporter les services Auth et Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
