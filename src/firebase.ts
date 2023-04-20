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
import updateFirestoreDoc from "@utils/updateFireStoreDB";

const provider = new firebase.auth.GoogleAuthProvider();
const db = firebase.firestore();
const auth = getAuth();

provider.setCustomParameters({
  prompt: "select_account",
});

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
  registerWithEmailAndPassword,
  loginWithEmailAndPassword,
};
