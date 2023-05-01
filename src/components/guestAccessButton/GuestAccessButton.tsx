import { continueAsGuest } from "@firebase";

function GuestAccessButton() {
  const handleGuestAccess = () => {
    continueAsGuest();
  };

  return (
    <button
      onClick={handleGuestAccess}
      className="mt-8 bg-yellow-500 px-4 py-2 border flex gap-2 rounded-lg text-black font-bold hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
      Continue as guest
    </button>
  );
}

export default GuestAccessButton;
