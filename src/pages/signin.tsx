import React from "react";
// @TODO tailwind -> import "./MyAccount.scss";
import Register from "@components/register/Register";
import Login from "@components/login/Login";

function Signin() {
  return (
    <div className="Signin">
      <Register />
      <div className="Signin__separatorH2">
        <h2 className="mt-8 mb-8 font-bold text-lg ml-8">OR</h2>
      </div>
      <Login />
    </div>
  );
}

export default Signin;
