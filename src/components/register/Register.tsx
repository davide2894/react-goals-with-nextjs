import SignInWithGoogle from "@components/loginWithGoogle/SignInWithGoogle";
import RegisterWithEmail from "@components/registerWithEmail/RegisterWithEmail";
import { MouseEventHandler } from "react";

function Register(props: { toggleRegistration: MouseEventHandler }) {
  return (
    <>
      <RegisterWithEmail />
      OR
      <SignInWithGoogle buttonText="Sign up with Google" />
      <button
        className="mt-4 underline text-white font-bold py-2"
        onClick={props.toggleRegistration}>
        Back to login page
      </button>
    </>
  );
}

export default Register;
