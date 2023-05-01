import ButtonIcon from "@components/buttonIcon/ButtonIcon";
import { loginWithGoogleProvider } from "@firebase";

function LoginWithGoogle() {
  const handleLoginWithGoogle = () => {
    loginWithGoogleProvider();
  };

  return (
    <button
      className="mt-8 bg-white px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
      onClick={handleLoginWithGoogle}>
      <ButtonIcon iconName="google-color" />
      <span>Login with Google</span>
    </button>
  );
}
export default LoginWithGoogle;
