import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXkc5uARV5D7zB9p-P1I0vg3oJrgKhPVw",
  authDomain: "pracovni-fond.firebaseapp.com",
  databaseURL: "https://pracovni-fond-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pracovni-fond",
  storageBucket: "pracovni-fond.appspot.com",
  messagingSenderId: "735785955459",
  appId: "1:735785955459:web:d8fc9a18d1a68cc8e56bb6",
  measurementId: "G-L79VLQELLM"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth()
const db = firebaseApp.firestore();
const storage = firebaseApp.storage().ref();
const googleProvider = new firebase.auth.GoogleAuthProvider()

export {
  auth, db, storage, googleProvider
};
