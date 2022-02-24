import firebase from "firebase/app";
import "firebase/firestore";
//import "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD4uzveMq83vDylNJoIDG1RAJiqENemlHU",
  authDomain: "devs-united-mu.firebaseapp.com",
  projectId: "devs-united-mu",
  storageBucket: "devs-united-mu.appspot.com",
  messagingSenderId: "161038984643",
  appId: "1:161038984643:web:2b181062e46ef24a3ac976",
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

//export const storage = firebase.storage();

export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();

export const loginGoogle = () => auth.signInWithPopup(provider);

export const logoutGoogle = () => auth.signOut();

export default firebase;
