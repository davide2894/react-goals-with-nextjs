import React from "react";

function SignedInInfo(props: { isGuest?: boolean; email: string }) {
  console.log({ props });

  const dateObj = new Date();
  const hrs = dateObj.getHours();
  const mins = dateObj.getMinutes();
  const seconds = dateObj.getSeconds();
  const milliseconds = dateObj.getMilliseconds();
  console.log(
    `SignedInInfo was rendered at ${hrs}-${mins}-${seconds}-${milliseconds}`
  );

  return (
    <div className="text-right">
      {props.email.includes("reactdailygoaltrackerguestprofile") ? (
        <p>Guest profile</p>
      ) : (
        <p>Singed in as {props.email}</p>
      )}
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function customPropsAreEqual(
  prevProps: { isGuest: boolean; email: string },
  nextProps: { isGuest: boolean; email: string }
) {
  console.log(
    "prevProps.isGuest === nextProps.isGuest",
    prevProps.isGuest === nextProps.isGuest
  );
  console.log(
    "prevProps.email === nextProps.email",
    prevProps.email === nextProps.email
  );

  return (
    prevProps.isGuest === nextProps.isGuest &&
    prevProps.email === nextProps.email
  );
}

export const MemoizedSignedInInfo = React.memo(SignedInInfo);
