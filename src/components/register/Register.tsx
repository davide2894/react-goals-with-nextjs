import React, { SyntheticEvent, useState } from "react";
import { registerWithEmailAndPassword } from "../../firebase";
import Loader from "@components/loader/Loader";
import { withAuthUser, AuthAction } from "next-firebase-auth";
import SubmitButton from "@components/submitButton/SubmitButton";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(evt: SyntheticEvent) {
    evt.preventDefault();
    registerWithEmailAndPassword(name, email, password);
  }

  return (
    <div
      data-testid="registerComponentTestElement"
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-gray-700 font-bold">
        Register an account to start setting goals{" "}
      </h2>
      <br></br>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label
            className="text-gray-700 text-sm font-bold mb-2"
            htmlFor="registrationFormNameInput">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="name"
            required
            id="registrationFormNameInput"
            placeholder="Enter name"
            value={name}
            onChange={(evt) => setName(evt.target.value)}
          />
          <span className="separator"> </span>
        </div>
        <div className="mb-2">
          <label
            className="text-gray-700 text-sm font-bold mb-2"
            htmlFor="registrationFormEmailInput">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            name="email"
            required
            id="registrationFormEmailInput"
            placeholder="Enter email"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
          />
          <span className="separator"> </span>
        </div>
        <div className="mb-4">
          <label
            className="text-gray-700 text-sm font-bold mb-2"
            htmlFor="registrationFormPasswordInput">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            name="password"
            required
            id="registrationFormPasswordInput"
            placeholder="Enter password"
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
          />
          <span className="separator"> </span>
        </div>
        <div>
          <SubmitButton text="Register" />
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
})(Register);
