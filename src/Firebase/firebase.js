import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

/*
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};
*/

const firebaseConfig = {
  apiKey: "AIzaSyBFdl3_lrr5tOGxn-d6qVLkd1UsmrBNang",
  authDomain: "wanderoast-5fa14.firebaseapp.com",
  databaseURL: "https://wanderoast-5fa14.firebaseio.com",
  projectId: "wanderoast-5fa14",
  storageBucket: "wanderoast-5fa14.appspot.com",
  messagingSenderId: "336154810204",
  appId: "1:336154810204:web:b5a3b116b0c80c492a9399",
  measurementId: "G-STBD6D438D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);