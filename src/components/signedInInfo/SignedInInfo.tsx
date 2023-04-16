import {
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
} from "react";

function SignedInInfo(props: { email: string }) {
  return (
    <div className="mt-8 text-right">
      <p>Signed in as {props.email}</p>
    </div>
  );
}

export default SignedInInfo;
