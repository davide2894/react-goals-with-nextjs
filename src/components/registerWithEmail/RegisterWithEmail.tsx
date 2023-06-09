import React, { SyntheticEvent, useState } from "react";
import { registerWithEmailAndPassword } from "@firebase";
import SubmitButton from "@components/submitButton/SubmitButton";
import { isSubmitting } from "@formSlice";
import { useDispatch } from "react-redux";
import log from "@utils/log";

export default function RegisterWithEmail() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  async function handleSubmit(evt: SyntheticEvent) {
    evt.preventDefault();
    dispatch(isSubmitting(true));
    log("isSubmitting");
    await registerWithEmailAndPassword(name, email, password);
    log("finished submitting");
  }

  return (
    <div
      data-testid="registerComponentTestElement"
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[380px] h-[380px]">
      <h2 className="text-gray-700 font-bold mb-6">
        Register an account to start setting goals{" "}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label
            className="text-gray-700 font-bold mb-2"
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
        </div>
        <div className="mb-2">
          <label
            className="text-gray-700 font-bold mb-2"
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
        </div>
        <div className="mb-4">
          <label
            className="text-gray-700 font-bold mb-2"
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
        </div>
        <div>
          <SubmitButton text="Register" />
        </div>
      </form>
    </div>
  );
}
