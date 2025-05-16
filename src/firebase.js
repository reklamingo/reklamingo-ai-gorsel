import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "API_KEYIN_BURAYA",
  authDomain: "proje-adi.firebaseapp.com",
  projectId: "proje-adi",
  storageBucket: "proje-adi.appspot.com",
  messagingSenderId: "XXX",
  appId: "XXX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);