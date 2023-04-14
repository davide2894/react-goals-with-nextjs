import React from "react";
// @TODO tailwind -> import "./MyAccount.scss";
import Register from "@components/register/Register";
import Login from "@components/login/Login";
import ProtectedPage from "@components/protectedPage/ProtectedPage";

function Signin() {
  return (
    <div className="Signin">
      <Register />
      <div className="Signin__separatorH2">
        <h2>OR</h2>
      </div>
      <Login />
    </div>
  );
}

export default Signin;
