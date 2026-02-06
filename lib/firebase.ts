import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCvUJ09c_jvOsnZF4-nF09-WdKqhahTKsU",
    authDomain: "voice-english-buddy.firebaseapp.com",
    projectId: "voice-english-buddy",
    storageBucket: "voice-english-buddy.appspot.com",
    messagingSenderId: "222356050299",
    appId: "1:222356050299:web:8649bdb6ba914cc27c6dde",
};

const app = !getApps().length
    ? initializeApp(firebaseConfig)
    : getApp();

export const db = getFirestore(app);
