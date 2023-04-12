import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/userSlice";
import Goals from "@components/goals/Goals";
import MyAccount from "@components/myAccount/MyAccount";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isUserLogged, setIsUserLogged] = useState<undefined | Boolean>(
    undefined
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      console.log("onAuthStateChanged");
      if (user) {
        setIsUserLogged(true);
        dispatch(
          login({
            email: user.email !== null ? user.email : "",
            uid: user.uid,
            userDocId: `${user.email}-${user.uid}`,
          })
        );
      } else {
        setIsUserLogged(false);
      }
    });

    return () => {
      console.log("onAuthStateChanged return fn");
    };
  }, [dispatch]);

  let content:
    | string
    | number
    | boolean
    | JSX.Element
    | React.ReactFragment
    | null
    | undefined;

  if (typeof isUserLogged !== "undefined") {
    if (isUserLogged) {
      content = <Goals />;
    } else {
      content = (
        <div className="home__welcomeMessage">
          <h1>WELCOME TO DAILY GOAL TRACKER</h1>
          <MyAccount />
        </div>
      );
    }
  }

  return <div className="home">{content}</div>;
}
