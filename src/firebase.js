import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCZVxBcu_axTYL9NhgYpOCpYuSGmKws_k8",
  authDomain: "homehub-e7d1f.firebaseapp.com",
  projectId: "homehub-e7d1f",
  storageBucket: "homehub-e7d1f.firebasestorage.app",
  messagingSenderId: "933430927806",
  appId: "1:933430927806:web:ea963d7ad6cfa0f80a59ef",
  measurementId: "G-ZJDC714KNZ"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
