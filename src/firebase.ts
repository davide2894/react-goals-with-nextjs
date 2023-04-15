// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import getUserDocId from "@utils/getUserDocId";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWuRUVtL5iesMW5-6Ugqv7pmitY_f-aoU",
  authDomain: "react-daily-goal-tracker.firebaseapp.com",
  projectId: "react-daily-goal-tracker",
  storageBucket: "react-daily-goal-tracker.appspot.com",
  messagingSenderId: "127766768496",
  appId: "1:127766768496:web:6580c3395f8f939587fdb5",
};

firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();
const db = firebase.firestore();
const auth = getAuth();

provider.setCustomParameters({
  prompt: "select_account",
});

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const registrationResult = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = registrationResult.user;
    const userDocId = getUserDocId(user.email, user.uid);
    await setDoc(doc(db, "users", userDocId), {
      name,
      email,
      uid: user.uid,
      authProvider: "local",
      refreshToken: user.refreshToken,
    });
  } catch (err) {
    alert(
      "There is an issue with the inserted email or password. Please try again"
    );
  }
};

const loginWithEmailAndPassword = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;
    if (user) {
      console.log({ msg: "user logged successfully", user });
    }
  } catch (err) {
    alert("There is an issue with your credentials. Please try again");
  }
};

export {
  firebase,
  provider,
  db,
  auth,
  registerWithEmailAndPassword,
  loginWithEmailAndPassword,
};
