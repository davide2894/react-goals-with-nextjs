import Loader from "@components/loader/Loader";
import SignInWithGoogle from "@components/loginWithGoogle/SignInWithGoogle";
import RegisterWithEmail from "@components/registerWithEmail/RegisterWithEmail";
import useFormClassNames from "@hooks/useFormClassNames";
import { withAuthUser, AuthAction } from "next-firebase-auth";
import Head from "next/head";
import Link from "next/link";

function RegisterPage() {
  const formClassNames = useFormClassNames();

  return (
    <>
      <Head>
        <title>Regiter</title>
      </Head>
      <div className={formClassNames}>
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
  whenUnauthedBeforeInit: AuthAction.RENDER,
  whenAuthedBeforeRedirect: AuthAction.SHOW_LOADER,
  LoaderComponent: Loader,
})(RegisterPage);
