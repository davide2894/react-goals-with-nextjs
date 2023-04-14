import useCheckUser from "@utils/useCheckUser";
import { Url } from "next/dist/shared/lib/router/router";
import React, { useReducer, useState } from "react";
import { useAppSelector } from "@redux/store";
import { useRouter } from "next/router";
import { useEffect } from "react";

function ProtectedPage({ children }: React.PropsWithChildren<{}>) {
  const checkUser = useCheckUser();
  const router = useRouter();

  useEffect(() => {
    if (checkUser !== undefined && !checkUser.isUserLogged) {
      router.push("/signin");
    }
  });

  return <>{checkUser.isUserLogged && children}</>;
}

export default ProtectedPage;
