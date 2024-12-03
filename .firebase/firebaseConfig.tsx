
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAY0kmXv_OBt6aPC4Gl35nHiXHpanrupxY",
    authDomain: "utrace-60950.firebaseapp.com",
    projectId: "utrace-60950",
    storageBucket: "utrace-60950.appspot.com",
    messagingSenderId: "58186438501",
    appId: "1:58186438501:android:9bd4722f4ea5da219c338c",
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
