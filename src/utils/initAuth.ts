// ./initAuth.js
import { init } from "next-firebase-auth";
import { firebase } from "../firebase";

const initAuth = () => {
  init({
    authPageURL: "/signin",
    appPageURL: "/goals",
    loginAPIEndpoint: "/api/login",
    logoutAPIEndpoint: "/api/logout",
    onLoginRequestError: (err: any) => {
      console.error(err);
    },
    onLogoutRequestError: (err: any) => {
      console.error(err);
    },
    firebaseAdminInitConfig: {
      credential: {
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
        // The private key must not be accessible on the client side.
        privateKey: process.env.FIREBASE_PRIVATE_KEY
          ? JSON.parse(process.env.FIREBASE_PRIVATE_KEY as string)
          : undefined,
      },
      databaseURL: "",
    },
    // Use application default credentials (takes precedence over firebaseAdminInitConfig if set)
    // useFirebaseAdminDefaultCredential: true,
    firebaseClientInitConfig: {
      apiKey: "AIzaSyDWuRUVtL5iesMW5-6Ugqv7pmitY_f-aoU", // required
      authDomain: "react-daily-goal-tracker.firebaseapp.com",
      databaseURL: "https://my-example-app.firebaseio.com",
      projectId: "react-daily-goal-tracker",
    },
    cookies: {
      name: "ExampleApp", // required
      // Keys are required unless you set `signed` to `false`.
      // The keys cannot be accessible on the client side.
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
      overwrite: true,
      path: "/",
      sameSite: "strict",
      secure: true, // set this to false in local (non-HTTPS) development
      signed: true,
    },
    onVerifyTokenError: (err: any) => {
      console.error(err);
    },
    onTokenRefreshError: (err: any) => {
      console.error(err);
    },
  });
};

export default initAuth;
