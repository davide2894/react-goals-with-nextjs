import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  getAdditionalUserInfo,
  User,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import getUserDocId from "@utils/getUserDocId";
import { FirebaseFirestore } from "@firebase/firestore-types";
import log from "@utils/log";
import { FirebaseApp } from "@firebase/app-compat";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY
    ? process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY
    : "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
    ? process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
    : undefined,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    ? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    : undefined,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
    ? process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
    : undefined,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSENGING_SENDER_ID
    ? process.env.NEXT_PUBLIC_FIREBASE_MESSENGING_SENDER_ID
    : "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
    ? process.env.NEXT_PUBLIC_FIREBASE_APP_ID
    : "",
};

let app: firebase.app.App | FirebaseApp | undefined;
let db: firebase.firestore.Firestore | FirebaseFirestore;
let auth: any;
let googleAuthProvider: firebase.auth.GoogleAuthProvider;

const initFirebase = () => {
  app = firebase.initializeApp(firebaseConfig);
  initFirestoreDb();
  initFirebaseAuth();
  initFirebaseProvider();
  googleAuthProvider.setCustomParameters({
    prompt: "select_account",
  });
};

const initFirestoreDb = () => {
  db = firebase.firestore();
};

const initFirebaseAuth = () => {
  auth = getAuth(app);
};

const initFirebaseProvider = () => {
  googleAuthProvider = new firebase.auth.GoogleAuthProvider();
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
  } catch (err) {
    alert(
      "There is an issue with the inserted email or password. Please try again"
    );
  }
};

const signInWithGoogleProvider = async () => {
  try {
    const result = await signInWithPopup(auth, googleAuthProvider);
    const user = result.user;

    const details = getAdditionalUserInfo(result);
    log("details -> ", details);

    if (user) {
      log({ msg: "user logged successfully with Google Auth Provider", user });
    }
  } catch (err) {
    log(err);
    alert("There is an issue with Google login. Please try again");
  }
};

const signInWithEmailAndPswd = async (email: string, password: string) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;

    log("details -> UserCredential object -> ", res);
    const details = getAdditionalUserInfo(res);
    log("details -> ", details);

    if (user) {
      log({ msg: "user logged successfully", user });
    }
  } catch (err) {
    alert("There is an issue with your credentials. Please try again");
  }
};

export {
  firebase,
  googleAuthProvider,
  db,
  auth,
  initFirebase,
  signInWithEmailAndPswd,
  signInWithEmailAndPassword,
  signInWithGoogleProvider,
  registerWithEmailAndPassword,
};
