import ButtonIcon from "@components/buttonIcon/ButtonIcon";
import { signInWithGoogleProvider } from "@firebase";

function SignInWithGoogle(props: { buttonText: string }) {
  const handleSignInWithGoogle = () => {
    signInWithGoogleProvider();
  };

  return (
    <button
      className="mt-8 w-[255px] bg-white px-4 py-2 border flex gap-2 border-slate-200 rounded-sm text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
      onClick={handleSignInWithGoogle}>
      <ButtonIcon iconName="google-color" />
      <span>{props.buttonText}</span>
    </button>
  );
}
export default SignInWithGoogle;
