import { useState, SyntheticEvent, ChangeEvent } from "react";
import { loginWithEmailAndPassword } from "@firebase";
import { AuthAction, withAuthUser } from "next-firebase-auth";
import Loader from "@components/loader/Loader";
import SubmitButton from "@components/submitButton/SubmitButton";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(evt: SyntheticEvent) {
    evt.preventDefault();
    loginWithEmailAndPassword(email, password);
  }

  function handleEmailChange(evt: ChangeEvent<HTMLInputElement>) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt: ChangeEvent<HTMLInputElement>) {
    setPassword(evt.target.value);
  }

  return (
    <div
      data-testid="loginComponentTest"
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-gray-700 font-bold">
        Login if you have already an account
      </h2>
      <br></br>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label
            className="text-gray-700 text-sm font-bold mb-2"
            htmlFor="loginFormEmailInput">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            name="email"
            required
            id="loginFormEmailInput"
            value={email}
            onChange={(evt) => handleEmailChange(evt)}
          />
          <span className="separator"> </span>
        </div>
        <div className="mb-4">
          <label
            className="text-gray-700 text-sm font-bold mb-2"
            htmlFor="loginFormPassword">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            name="password"
            required
            id="loginFormPassword"
            value={password}
            onChange={(evt) => handlePasswordChange(evt)}
          />
          <span className="separator"> </span>
        </div>
        <div>
          <SubmitButton text="Login" />
        </div>
      </form>
    </div>
  );
}

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.RENDER,
  LoaderComponent: Loader,
})(Login);

// export const getServerSideProps = withAuthUserSSR({
//   whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
// })();
