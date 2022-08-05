import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD5f41ywVqFMZx7SZgygKKBcvRVh0pc4tU",
  authDomain: "instagram-e324d.firebaseapp.com",
  projectId: "instagram-e324d",
  storageBucket: "instagram-e324d.appspot.com",
  messagingSenderId: "357175135229",
  appId: "1:357175135229:web:4cfec73d8c7b8f4366a794",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();
const storage = getStorage();

export { db, storage, app };
