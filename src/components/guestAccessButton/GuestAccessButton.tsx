import ButtonIcon from "@components/buttonIcon/ButtonIcon";
import { registerWithEmailAndPassword } from "@firebase";
import { isSubmitting } from "@formSlice";
import log from "@utils/log";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

function GuestAccessButton() {
  const dispatch = useDispatch();

  async function handleGuestAccess() {
    log("guest user registration -> registering guest user");
    dispatch(isSubmitting(true));
    await registerWithEmailAndPassword(
      "guest",
      `reactdailygoaltrackerguestprofile${uuidv4()}11${uuidv4()}@yopmail.com`,
      `guestAccessPassword123${uuidv4()}`
    );
    log("guest user registration -> finished guest user registration");
  }

  return (
    <button
      onClick={handleGuestAccess}
      className="mt-8 w-[255px] bg-yellow-500 px-4 py-2 border flex gap-2 rounded-sm text-black font-bold hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
      <ButtonIcon iconName="user-icon" />
      <span>Continue as guest</span>
    </button>
  );
}

export default GuestAccessButton;
