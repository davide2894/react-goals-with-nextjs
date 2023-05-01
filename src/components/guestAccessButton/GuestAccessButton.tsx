import { registerWithEmailAndPassword } from "@firebase";
import { isGuest } from "@guestAccessSlice/guestAccessSlice";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

function GuestAccessButton() {
  const dispatch = useDispatch();

  const handleGuestAccess = () => {
    registerWithEmailAndPassword(
      "guest",
      `reactdailygoaltrackerguestprofile${uuidv4()}11${uuidv4()}@yopmail.com`,
      `guestAccessPassword123${uuidv4()}`
    );
    localStorage.setItem("isGuestSession", "true");
    dispatch(isGuest(true));
  };

  return (
    <button
      onClick={handleGuestAccess}
      className="mt-8 w-[255px] bg-yellow-500 px-4 py-2 border flex gap-2 rounded-sm text-black font-bold hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
      Continue as guest
    </button>
  );
}

export default GuestAccessButton;
