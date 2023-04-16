import {
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
} from "react";

function SignedInInfo(props: { email: string }) {
  return (
    <div>
      <p>Signed in as {props.email}</p>
    </div>
  );
}

export default SignedInInfo;
