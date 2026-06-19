import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, update, push, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBkSL6Uu5ckO2Sawdzx1hXIKG_Fd8Rv-XI",
  authDomain: "altapilcha-7c232.firebaseapp.com",
  databaseURL: "https://altapilcha-7c232-default-rtdb.firebaseio.com",
  projectId: "altapilcha-7c232",
  storageBucket: "altapilcha-7c232.firebasestorage.app",
  messagingSenderId: "398395795029",
  appId: "1:398395795029:web:c30568b9cc670eaf6a96dc"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export { ref, onValue, update, push, set };
