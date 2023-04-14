import { auth } from "@firebase";
import { login } from "@redux/slices/userSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function useCheckUser() {
  const [isUserLogged, setUserIsLogged] = useState<boolean | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    const listener = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user is logged in");
        console.log(user);
        dispatch(
          login({
            email: user.email !== null ? user.email : "",
            uid: user.uid,
            userDocId: `${user.email}-${user.uid}`,
          })
        );
        setUserIsLogged(true);
      } else {
        console.log("user is NOT logged in");
        setUserIsLogged(false);
      }
    });

    return () => {
      listener();
    };
  }, []);

  return { isUserLogged };
}
