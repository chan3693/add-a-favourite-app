// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getFirestore} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_6La664SyE4XlkBdUN6kU7xxZSMmEyeo",
  authDomain: "sheungkit-videos.firebaseapp.com",
  projectId: "sheungkit-videos",
  storageBucket: "sheungkit-videos.appspot.com",
  messagingSenderId: "1004950894965",
  appId: "1:1004950894965:web:363e9979a39ba8342d3b3c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db }