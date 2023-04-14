import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Inter } from "next/font/google";
import { useState, useEffect, useReducer } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/userSlice";
import Goals from "@components/goals/Goals";
import MyAccount from "@components/myAccount/MyAccount";
import router, { useRouter } from "next/router";
import Layout from "@components/layout/Layout";
import useCheckUser from "@utils/useCheckUser";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const checkUser = useCheckUser();

  let content;

  if (checkUser.isUserLogged !== null) {
    if (checkUser.isUserLogged) {
      content = (
        <div>
          <Link href={"/goals"}>Go to Goals page</Link>
        </div>
      );
    } else {
      content = (
        <div>
          <Link href={"/signin"}>Sign in</Link>
        </div>
      );
    }
  } else {
    content = <div>Retrieving info...</div>;
  }

  return (
    <Layout>
      <div className="home">{content}</div>
    </Layout>
  );
}
