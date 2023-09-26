// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1v_UDeRl-FX4SaQHK9xxlkpGFreiA20M",
  authDomain: "ecommerce-tdb.firebaseapp.com",
  projectId: "ecommerce-tdb",
  storageBucket: "ecommerce-tdb.appspot.com",
  messagingSenderId: "496559561080",
  appId: "1:496559561080:web:c893da695eb243bfcbd08d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Firestore Operations

export const db = getFirestore();

export function firebase() {
  return app;
}
