import ButtonIcon from "@components/buttonIcon/ButtonIcon";
import { auth } from "@firebase";
import { signOut } from "firebase/auth";
import router from "next/router";
import React from "react";

function SignOutButton() {
  function handleSignOut() {
    signOut(auth)
      .then(() => {
        console.log("signedout");
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
