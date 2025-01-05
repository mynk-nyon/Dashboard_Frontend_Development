// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAXpIKexErZJRrjVNbX9eIVoqdy1x-ANlU",
  authDomain: "dashboard-assesment.firebaseapp.com",
  projectId: "dashboard-assesment",
  storageBucket: "dashboard-assesment.firebasestorage.app",
  messagingSenderId: "1078241364904",
  appId: "1:1078241364904:web:48ab2313a72df88757ab9d",
  measurementId: "G-6WHSPH99ZQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
