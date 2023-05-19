import { AuthAction, withAuthUser } from "next-firebase-auth";
import Head from "next/head";
import Loader from "@components/loader/Loader";
import useFormClassNames from "@hooks/useFormClassNames";
import SignIn from "@components/signIn/SignIn";
import { useState } from "react";
import Register from "@components/register/Register";

function Auth() {
  const formClassNames = useFormClassNames();
  const [showRegistration, setShowRegistration] = useState(false);

  function toggleRegistrationHandler() {
    setShowRegistration((prev) => !prev);
  }

  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <div className={formClassNames}>
        {showRegistration ? (
          <Register toggleRegistration={toggleRegistrationHandler} />
        ) : (
          <SignIn toggleRegistration={toggleRegistrationHandler} />
        )}
      </div>
    </>
  );
}

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenAuthedBeforeRedirect: AuthAction.RETURN_NULL,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  LoaderComponent: Loader,
})(Auth);
