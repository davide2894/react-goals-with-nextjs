import ButtonIcon from "@components/buttonIcon/ButtonIcon";
import { auth } from "@firebase";
import { resetGoals } from "@goalSlice/goalSlice";
import { signOut } from "firebase/auth";
import React from "react";
import { useDispatch } from "react-redux";
import log from "@utils/log";
import { isGuest } from "@guestAccessSliceguestAccessSlice";
import { useAppSelector } from "@store";

function SignOutButton() {
  const dispatch = useDispatch();
  const isGuestState = useAppSelector(
    (state) => state.guestAccessReducer.isGuest
  );

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        log("signedout");
        dispatch(resetGoals());
        if (isGuestState) {
          dispatch(isGuest(false));
          // deleteUser(auth.currentUser);
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  return (
    <button className="ml-2" onClick={handleSignOut} title="sing out">
      <ButtonIcon iconName="signout-button" />
    </button>
  );
}

export default SignOutButton;
