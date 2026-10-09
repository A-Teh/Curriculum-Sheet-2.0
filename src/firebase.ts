import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-N9AOX8lOjFGJQQSC7ilSqWdevE7aJNY",
  authDomain: "curriculum-sheet-2.firebaseapp.com",
  projectId: "curriculum-sheet-2",
  storageBucket: "curriculum-sheet-2.firebasestorage.app",
  messagingSenderId: "62077147825",
  appId: "1:62077147825:web:d8090e1b8ce41589fda090",
  measurementId: "G-SM9ZJ7Z69N"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);