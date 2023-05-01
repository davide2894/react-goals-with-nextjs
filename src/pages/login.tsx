import React from "react";
import LoginWithEmail from "@components/loginWithEmail/LoginWithEmail";
import { AuthAction, withAuthUser } from "next-firebase-auth";
import Head from "next/head";
import Link from "next/link";
import LoginWithGoogle from "@components/loginWithGoogle/LoginWithGoogle";
import GuestAccessButton from "@components/guestAccessButton/GuestAccessButton";

function Login() {
  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <div className="flex flex-col items-center lg:justify-center  mt-14">
        <LoginWithEmail />
        or
        <LoginWithGoogle />
        <GuestAccessButton />
        <Link
          className="mt-4 underline text-white font-bold py-2"
          href="/register">
          Create account
        </Link>
      </div>
    </>
  );
}

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})(Login);
