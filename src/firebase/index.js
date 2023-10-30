import {initializeApp} from "firebase/app";
import {getDatabase} from '@react-native-firebase/database'


const firebaseConfig = {
  apiKey: "AIzaSyABDggLbGI1cpYJruXzDPLDDZuLLQWgjVw",
  authDomain: "antipanico-411a3.firebaseapp.com",
  projectId: "antipanico-411a3",
  storageBucket: "antipanico-411a3.appspot.com",
  messagingSenderId: "139395984733",
  appId: "1:139395984733:android:54df9c14480a40dae70cb4"
};


const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)