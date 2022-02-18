// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCb-kOWB3XHtE_xOAHWCRElOIG45mIV8rQ",
  authDomain: "shiper-ac3d7.firebaseapp.com",
  projectId: "shiper-ac3d7",
  storageBucket: "shiper-ac3d7.appspot.com",
  messagingSenderId: "264640785874",
  appId: "1:264640785874:web:7773b57bff2f2931e36c0b",
  measurementId: "G-GCWNQFYZ77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);