import { initializeApp } from 'firebase/app';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBcJfoSluwPpmGf9DnPa5bGhIClyf-SEWc",
    authDomain: "react-native-auth-51504.firebaseapp.com",
    projectId: "react-native-auth-51504",
    storageBucket: "react-native-auth-51504.appspot.com",
    messagingSenderId: "714870198669",
    appId: "1:714870198669:web:a72fcc8c411b881688adc4"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, setDoc, doc, getDoc }