import React from "react";
import Register from "@components/register/Register";
import Login from "@components/login/Login";
import { AuthAction, withAuthUser } from "next-firebase-auth";
import Loader from "@components/loader/Loader";
import Head from "next/head";

function Signin() {
  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <div className="flex flex-col items-center lg:justify-center lg:flex-row mt-14">
        <Register />
        <div className="lg:ml-8 lg:mr-8">
          <h2 className="mt-8 mb-8 font-bold text-lg">OR</h2>
        </div>
        <Login />
      </div>
    </>
  );
}

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.RENDER,
  LoaderComponent: Loader,
})(Signin);
