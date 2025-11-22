

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { initializeAuth, inMemoryPersistence, getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDRRXxOcgqTNJFbgYyfFuBBZawUuhw3FvA",
  authDomain: "mad-firebase-2a37c.firebaseapp.com",
  projectId: "mad-firebase-2a37c",
  storageBucket: "mad-firebase-2a37c.firebasestorage.app",
  messagingSenderId: "708421380410",
  appId: "1:708421380410:web:2b84d1179472ec19a74803",
  measurementId: "G-10FQ6QCSW8",
  databaseURL:'https://mad-firebase-2a37c-default-rtdb.firebaseio.com/'
};

const app = initializeApp(firebaseConfig);


const auth = initializeAuth(app, {
  persistence: inMemoryPersistence
});

const database = getDatabase(app);


export { app, auth, database };