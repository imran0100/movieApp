import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCUzY-Y8FVP7zyzO1h0B2FWo5C885q-luk",
  authDomain: "movieclone-dbc5f.firebaseapp.com",
  projectId: "movieclone-dbc5f",
  storageBucket: "movieclone-dbc5f.appspot.com",
  messagingSenderId: "964682939195",
  appId: "1:964682939195:web:5e2fd5e4ad48c9777ed51e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
