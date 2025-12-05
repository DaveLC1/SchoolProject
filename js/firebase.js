import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAzR3LZH4bqKX_f2LExhbzyQ8Hprycu7fM",
  authDomain: "groupblog-4.firebaseapp.com",
  projectId: "groupblog-4",
  storageBucket: "groupblog-4.firebasestorage.app",
  messagingSenderId: "170825261982",
  appId: "1:170825261982:web:e628d3a9ce928ec316ac8f"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
