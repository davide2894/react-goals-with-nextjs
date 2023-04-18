import React from "react";
import Register from "@components/register/Register";
import Login from "@components/login/Login";

function Signin() {
  return (
    <div className="flex flex-col items-center lg:justify-center lg:flex-row mt-14">
      <Register />
      <div className="lg:ml-8 lg:mr-8">
        <h2 className="mt-8 mb-8 font-bold text-lg">OR</h2>
      </div>
      <Login />
    </div>
  );
}

export default Signin;
