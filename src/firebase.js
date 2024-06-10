// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAd9CdtdXIybhdGARkFoQMArXiDTCgwqbo",
  authDomain: "movie-53701.firebaseapp.com",
  projectId: "movie-53701",
  storageBucket: "movie-53701.appspot.com",
  messagingSenderId: "289724662874",
  appId: "1:289724662874:web:d95048375e2e4fb4150463"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
