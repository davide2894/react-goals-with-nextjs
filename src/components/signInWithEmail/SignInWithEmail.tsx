import { useState, SyntheticEvent, ChangeEvent } from "react";
import { signInWithEmailAndPswd } from "@firebase";
import SubmitButton from "@components/submitButton/SubmitButton";
import { useDispatch } from "react-redux";
import { isSubmitting } from "@formSlice";

function SignInWithEmail() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  async function handleSubmit(evt: SyntheticEvent) {
    evt.preventDefault();
    dispatch(isSubmitting(true));
    await signInWithEmailAndPswd(email, password);
  }

  function handleEmailChange(evt: ChangeEvent<HTMLInputElement>) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt: ChangeEvent<HTMLInputElement>) {
    setPassword(evt.target.value);
  }

  return (
    <div
      data-testid="signInComponentTest"
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[380px] h-[380px]">
      <h2 className="text-gray-700 font-bold mb-6">
        Login if you have already an account
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label
            className="text-gray-700 font-bold mb-2"
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
        </div>
        <div className="mb-4">
          <label
            className="text-gray-700 font-bold mb-2"
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
        </div>
        <div>
          <SubmitButton text="Login" />
        </div>
      </form>
    </div>
  );
}

export default SignInWithEmail;
