import { initializeApp } from "firebase/app";
import {getFirestore} from  "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDMbtrm16qARBleQ_8b6mP6lQDs6bNX0Mk",
  authDomain: "mini-blog-b9bcb.firebaseapp.com",
  projectId: "mini-blog-b9bcb",
  storageBucket: "mini-blog-b9bcb.firebasestorage.app",
  messagingSenderId: "454483110014",
  appId: "1:454483110014:web:52a934b8cbe83e1dcd102f"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {app, db};