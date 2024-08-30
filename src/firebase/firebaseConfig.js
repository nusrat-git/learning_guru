// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIPS00f_56pbPvD63_MMYPKgdKUX442fw",
  authDomain: "tracklocation-c12fe.firebaseapp.com",
  databaseURL: "https://tracklocation-c12fe-default-rtdb.firebaseio.com",
  projectId: "tracklocation-c12fe",
  storageBucket: "tracklocation-c12fe.appspot.com",
  messagingSenderId: "492761724996",
  appId: "1:492761724996:web:b10c3858fbe638f23ea411",
  measurementId: "G-4RPX74NDHR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
