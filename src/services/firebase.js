import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// const analytics = getAnalytics(app);  


const firebaseConfig = {
    apiKey: "AIzaSyCJYKEfhwJLFF6p-dVgK4r6UiZ7hhJJLEg",
    authDomain: "electio-sn.firebaseapp.com",
    projectId: "electio-sn",
    storageBucket: "electio-sn.appspot.com",
    messagingSenderId: "554809214908",
    appId: "1:554809214908:web:6b56cc77d599fdb5100db9",
    measurementId: "G-RXN4GMET3X"
};

const app = initializeApp(firebaseConfig);
export default app;

export const db = getFirestore(app);

export const auth = getAuth(app);

