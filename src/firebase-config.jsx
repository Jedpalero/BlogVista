import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCmIwUFGRbRAbBVBK4ty_2uTwt8JlE6BCo",
  authDomain: "bl0gvista.firebaseapp.com",
  projectId: "bl0gvista",
  storageBucket: "bl0gvista.appspot.com",
  messagingSenderId: "116395391803",
  appId: "1:116395391803:web:e4cc1f984cc2b1d88a951e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
