import { useAppSelector } from "@store";
import log from "@utils/log";

function SignedInInfo(props: { email: string }) {
  const isGuestState = useAppSelector(
    (state) => state.guestAccessReducer.isGuest
  );

  isGuestState
    ? log("rendering SignedInInfo for guest profile")
    : log("rendering SignedInInfo for logged profile");

  return (
    <div className="mt-8 text-right">
      {isGuestState && props.email ? (
        <p>Guest profile</p>
      ) : (
        <p>Signed in as {props.email}</p>
      )}
    </div>
  );
}

export default SignedInInfo;
