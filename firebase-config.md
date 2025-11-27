`npm install firebase`

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvF7uS1iyJJbO33phdoHvw5SEK3IyJLAk",
  authDomain: "newagent-6f729.firebaseapp.com",
  databaseURL: "https://newagent-6f729.firebaseio.com",
  projectId: "newagent-6f729",
  storageBucket: "newagent-6f729.firebasestorage.app",
  messagingSenderId: "309988290785",
  appId: "1:309988290785:web:b17a2011ae38de262a87a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);