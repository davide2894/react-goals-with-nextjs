import ButtonIcon from "@components/buttonIcon/ButtonIcon";
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
    <button className="ml-2" onClick={handleSignOut} title="sing out">
      <span className="block w-[25px] h-[25px] bg-no-repeat bg-center bg-[url('../../public/signout-button.svg')] bg-contain"></span>
    </button>
  );
}

export default SignOutButton;
