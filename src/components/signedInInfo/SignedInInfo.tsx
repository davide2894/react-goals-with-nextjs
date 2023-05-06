import React from "react";

function SignedInInfo(props: { isGuest?: boolean; email: string }) {
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

export const MemoizedSignedInInfo = React.memo(SignedInInfo);
