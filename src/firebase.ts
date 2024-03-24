import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyCDQTkS6M7Pv1EUA5hEmoYozuWZ_FTQGec",
    authDomain: "authentication-app23.firebaseapp.com",
    projectId: "authentication-app23",
    storageBucket: "authentication-app23.appspot.com",
    messagingSenderId: "707475942428",
    appId: "1:707475942428:web:cbf5e0a698f570a0fc43d9",
    measurementId: "G-8C15TH29GZ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const storageRef = ref(storage);
export { app, db, storageRef, storage }