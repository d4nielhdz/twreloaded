// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCY6dh_7poBvOvXBg3IVYpJKhnbmHdcih4",
  authDomain: "twreloaded-cc2cf.firebaseapp.com",
  projectId: "twreloaded-cc2cf",
  storageBucket: "twreloaded-cc2cf.appspot.com",
  messagingSenderId: "930233804183",
  appId: "1:930233804183:web:d2fb254fbd18e5691290d2",
  measurementId: "G-EDLZ71Q358"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);