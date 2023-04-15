import "@styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import initAuth from "@utils/initAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function App({ Component, pageProps }: AppProps) {
  const firebaseConfig = {
    apiKey: "AIzaSyDWuRUVtL5iesMW5-6Ugqv7pmitY_f-aoU",
    authDomain: "react-daily-goal-tracker.firebaseapp.com",
    projectId: "react-daily-goal-tracker",
    storageBucket: "react-daily-goal-tracker.appspot.com",
    messagingSenderId: "127766768496",
    appId: "1:127766768496:web:6580c3395f8f939587fdb5",
  };

  firebase.initializeApp(firebaseConfig);

  initAuth();

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
