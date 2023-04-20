import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import getUserDocId from "@utils/getUserDocId";
import updateFirestoreDoc from "@utils/updateFireStoreDB";
import initAuth from "@utils/initAuth";
import { FirebaseFirestore } from "@firebase/firestore-types";
import { FirebaseAuth } from "@firebase/auth-types";

const firebaseConfig = {
  apiKey: "AIzaSyDWuRUVtL5iesMW5-6Ugqv7pmitY_f-aoU",
  authDomain: "react-daily-goal-tracker.firebaseapp.com",
  projectId: "react-daily-goal-tracker",
  storageBucket: "react-daily-goal-tracker.appspot.com",
  messagingSenderId: "127766768496",
  appId: "1:127766768496:web:6580c3395f8f939587fdb5",
};

let db: firebase.firestore.Firestore | FirebaseFirestore;
let auth: any;
let provider: firebase.auth.GoogleAuthProvider;

const initFirebase = () => {
  firebase.initializeApp(firebaseConfig);
  initFirestoreDb();
  initFirebaseAuth();
  initFirebaseProvider();
  provider.setCustomParameters({
    prompt: "select_account",
  });
};

const initFirestoreDb = () => {
  db = firebase.firestore();
};

const initFirebaseAuth = () => {
  auth = getAuth();
};

const initFirebaseProvider = () => {
  provider = new firebase.auth.GoogleAuthProvider();
};

const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const registrationResult = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = registrationResult.user;
    const userDocId = getUserDocId(user.email, user.uid);
    const userDocRef = doc(db, `users/${userDocId}`);
    await setDoc(userDocRef, {
      name,
      email,
      uid: user.uid,
      authProvider: "local",
      refreshToken: user.refreshToken,
    });

    if (userDocId) {
      updateFirestoreDoc(
        userDocId,
        {
          title: "this is an example goal. You should start adding yours! :)",
          score: {
            max: 5,
            min: 0,
            actual: 0,
          },
          id: "exampleId",
          userIdRef: user.uid,
          timestamp: Date.now(),
        },
        "add"
      );
    }
  } catch (err) {
    alert(
      "There is an issue with the inserted email or password. Please try again"
    );
  }
};

const loginWithEmailAndPassword = async (email: string, password: string) => {
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
  initFirebase,
  registerWithEmailAndPassword,
  loginWithEmailAndPassword,
};
