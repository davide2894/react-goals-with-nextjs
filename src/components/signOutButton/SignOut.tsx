import ButtonIcon from "@components/buttonIcon/ButtonIcon";
import { auth } from "@firebase";
import { resetGoals, syncWithBackend } from "@redux/slices/goalSlice";
import { signOut } from "firebase/auth";
import React from "react";
import { useDispatch } from "react-redux";

function SignOutButton() {
  const dispatch = useDispatch();

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        console.log("signedout");
        dispatch(resetGoals());
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  return (
    <button className="ml-2" onClick={handleSignOut} title="sing out">
      <ButtonIcon iconName="signout-button" />
    </button>
  );
}

export default SignOutButton;
