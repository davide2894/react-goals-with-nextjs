import useCheckUser from "@utils/_delete_useCheckUser";
import React, { useReducer, useState } from "react";
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
