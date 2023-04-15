import { auth } from "@firebase";
import { signOut } from "firebase/auth";
import router from "next/router";
import React from "react";

function SignOutButton() {
  function handleSignOut() {
    signOut(auth)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  return (
    <button
      className="cta cta__signOut w-4 h-4 block bg-white"
      onClick={handleSignOut}
      title="sing out">
      <span className="cta__signOutIcon"></span>
      Singout
    </button>
  );
}

export default SignOutButton;
