import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqhiWefVkScfsyso-G1CO9JlA4uIVE3AM",
  authDomain: "springfieldhld-8b0b1.firebaseapp.com",
  projectId: "springfieldhld-8b0b1",
  storageBucket: "springfieldhld-8b0b1.firebasestorage.app",
  messagingSenderId: "873916050973",
  appId: "1:873916050973:web:958fac4c7cfad9c8f2a0f4",
  measurementId: "G-REVJGDR80R",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
