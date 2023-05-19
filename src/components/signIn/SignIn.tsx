import GuestAccessButton from "@components/guestAccessButton/GuestAccessButton";
import SignInWithGoogle from "@components/loginWithGoogle/SignInWithGoogle";
import SignInWithEmail from "@components/signInWithEmail/SignInWithEmail";
import React, { MouseEventHandler } from "react";

function SignIn(props: { toggleRegistration: MouseEventHandler }) {
  return (
    <>
      <SignInWithEmail />
      OR
      <SignInWithGoogle buttonText="Sign in with Google" />
      <GuestAccessButton />
      <button
        className="mt-4 underline text-white font-bold py-2"
        onClick={props.toggleRegistration}>
        Create account
      </button>
    </>
  );
}

export default SignIn;
