import React from "react";

// eslint-disable-next-line no-unused-vars
function SignedInAsGuest(props: { isGuest?: string }) {
  const dateObj = new Date();
  const hrs = dateObj.getHours();
  const mins = dateObj.getMinutes();
  const seconds = dateObj.getSeconds();
  const milliseconds = dateObj.getMilliseconds();
  console.log(
    `SignedInAsGuest was rendered at ${hrs}-${mins}-${seconds}-${milliseconds}`
  );

  return <div>SignedInAsGuest</div>;
}

export default SignedInAsGuest;
