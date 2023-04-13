import React from "react";
// @TODO tailwind -> import "./MyAccount.scss";
import Register from "@components/register/Register";
import Login from "@components/login/Login";

function MyAccount() {
  return (
    <div className="myAccount">
      <Register />
      <div className="myAccount__separatorH2">
        <h2>OR</h2>
      </div>
      <Login />
    </div>
  );
}

export default MyAccount;
