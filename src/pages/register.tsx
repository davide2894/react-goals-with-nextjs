import RegistrationForm from "@components/register/RegistrationForm";
import { withAuthUser, AuthAction } from "next-firebase-auth";
import Head from "next/head";
import Link from "next/link";

function RegisterPage() {
  return (
    <>
      <Head>
        <title>Regiter</title>
      </Head>
      <div className="flex flex-col items-center lg:justify-center  mt-14">
        <RegistrationForm />
        <Link className="underline text-white font-bold py-2" href="/login">
          Back to login page
        </Link>
      </div>
    </>
  );
}

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})(RegisterPage);
