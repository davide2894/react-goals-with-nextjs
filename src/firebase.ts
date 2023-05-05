import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInAnonymously,
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
import { v4 as uuidv4 } from "uuid";

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

    const details = getAdditionalUserInfo(registrationResult);
    log("details -> ", details);

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
    if (details?.isNewUser) {
      await createExampleGoal(user);
    } else {
      log("Firebase.ts file -> user already registered");
    }
  } catch (err) {
    alert(
      "There is an issue with the inserted email or password. Please try again"
    );
  }
};

const continueAsGuest = async (authInstance = auth) => {
  try {
    const result = await signInAnonymously(authInstance);
    const user = result.user;

    const details = getAdditionalUserInfo(result);
    log("details -> ", details);

    if (user) {
      log({
        msg: "user logged successfully as guest",
        user,
      });
      const randomEmailForGuestUser = `reactdailygoaltrackerguestprofile${uuidv4()}@yopmail.com`;
      const userDocId = getUserDocId(randomEmailForGuestUser, user.uid);
      const userDocRef = doc(db, `users/${userDocId}`);

      await setDoc(userDocRef, {
        email: randomEmailForGuestUser,
        uid: user.uid,
        authProvider: "local",
        refreshToken: user.refreshToken,
      });

      if (details?.isNewUser) {
        log("Firebase.ts file -> creating example goal for new user");
        await createExampleGoal(user);
      } else {
        log("Firebase.ts file -> user already registered");
      }
    }
  } catch (err) {
    log(err);
    alert(
      "There was an issue while trying to access as a guest. Please try again"
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

const submitWithEmailAndPassword = async (email: string, password: string) => {
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

const createExampleGoal = async (user: User) => {
  const exampleGoal = {
    title:
      "Firebase.ts file -> this is an example goal. You should start adding yours! :)",
    score: {
      max: 5,
      min: 0,
      actual: 0,
    },
    id: "exampleId",
    userIdRef: user.uid,
    timestamp: Date.now(),
  };

  const exampleDocRef = doc(
    db,
    `/users/${getUserDocId(user.email, user.uid)}/user-goals/${exampleGoal.id}`
  );
  log("Firebase.ts file -> creating example goal for new user");
  await setDoc(exampleDocRef, exampleGoal, { merge: true });
  log("Firebase.ts file -> created example goal for new user");
  log({ newUserGoal: exampleGoal });
};

export {
  firebase,
  googleAuthProvider,
  db,
  auth,
  initFirebase,
  registerWithEmailAndPassword,
  submitWithEmailAndPassword,
  signInWithGoogleProvider,
  continueAsGuest,
};
