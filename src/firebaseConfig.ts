import { initializeApp } from "firebase/app";
// Import Realtime Database
import { get, getDatabase, ref, set } from "firebase/database";
// Import Analytics (optional)
import { getAnalytics } from "firebase/analytics";
// Import Firestore (optional)
import { getFirestore } from "firebase/firestore";
// Import Firebase Authentication (optional)
import { getAuth } from "firebase/auth";

// Firebase configuration object (make sure your details are correct)
const firebaseConfig = {
    apiKey: "AIzaSyDyZQBhP0v7JUvR3HxzG-rPktkHdB6o-hQ",
    authDomain: "cgi109-285d3.firebaseapp.com",
    databaseURL: "https://cgi109-285d3-default-rtdb.firebaseio.com", // Realtime Database URL
    projectId: "cgi109-285d3",
    storageBucket: "cgi109-285d3.firebasestorage.app",
    messagingSenderId: "621879703904",
    appId: "1:621879703904:web:fce51bbe1f832331e00605",
    measurementId: "G-P0HJ0W498R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Realtime Database
const database = getDatabase(app);

// Initialize Firestore (if you plan to use Firestore)
const db = getFirestore(app);

// Initialize Firebase Authentication (if you plan to use Authentication)
const auth = getAuth(app);

export { database, db, auth, ref, set, get };
