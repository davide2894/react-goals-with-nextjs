import SignInWithEmail from "@components/signInWithEmail/SignInWithEmail";
import { AuthAction, withAuthUser } from "next-firebase-auth";
import Head from "next/head";
import Link from "next/link";
import SignInWithGoogle from "@components/loginWithGoogle/SignInWithGoogle";
import GuestAccessButton from "@components/guestAccessButton/GuestAccessButton";
import Loader from "@components/loader/Loader";
import { useAppSelector } from "@store";

function Login() {
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
        <title>Sign in</title>
      </Head>
      <div className={containerClassNames}>
        <SignInWithEmail />
        OR
        <SignInWithGoogle buttonText="Sign in with Google" />
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
  whenAuthedBeforeRedirect: AuthAction.SHOW_LOADER,
  LoaderComponent: Loader,
})(Login);
