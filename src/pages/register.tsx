import Loader from "@components/loader/Loader";
import SignInWithGoogle from "@components/loginWithGoogle/SignInWithGoogle";
import RegisterWithEmail from "@components/registerWithEmail/RegisterWithEmail";
import { withAuthUser, AuthAction } from "next-firebase-auth";
import Head from "next/head";
import Link from "next/link";
import { useAppSelector } from "@store";

function RegisterPage() {
  const isSubmitting = useAppSelector(
    (state) => state.formReducer.isSubmitting
  );

  let containerClassNames =
    "flex flex-col items-center lg:justify-center mt-14";

  if (isSubmitting) {
    containerClassNames += " pointer-events-none opacity-50";
  }

  return (
    <>
      <Head>
        <title>Regiter</title>
      </Head>
      <div className={containerClassNames}>
        <RegisterWithEmail />
        OR
        <SignInWithGoogle buttonText="Sign up with Google" />
        <Link
          className="mt-4 underline text-white font-bold py-2"
          href="/login">
          Back to login page
        </Link>
      </div>
    </>
  );
}

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenAuthedBeforeRedirect: AuthAction.SHOW_LOADER,
  LoaderComponent: Loader,
})(RegisterPage);
