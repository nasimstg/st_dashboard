import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCCmeKeH2BNVRnc4A3yek1AefrBP75qEkE",
  authDomain: "st-dashboard-a8c96.firebaseapp.com",
  projectId: "st-dashboard-a8c96",
  storageBucket: "st-dashboard-a8c96.appspot.com",
  messagingSenderId: "453187792697",
  appId: "1:453187792697:web:ea7719b19ee351a0cec2e8"
};

export const firebaseApp = initializeApp(firebaseConfig);