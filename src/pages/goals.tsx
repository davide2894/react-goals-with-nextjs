import Goal from "@components/goal/Goal";
//TODO tailwind -> import "./Goals.scss";
import NewGoalButton from "@components/newGoalButton/NewGoalButton";
import { useAppSelector } from "@redux/store";
import ErrorLogger from "@components/errorLogger/ErrorLogger";
import { ReactFragment, useEffect } from "react";
import { useDebounce } from "use-debounce";
import useSyncFirestoreDb from "@utils/useSyncFirestoreDB";
import { useFetchGoalsQuery } from "@redux/slices/goalsApi";
import { useDispatch } from "react-redux";
import { syncWithBackend } from "@redux/slices/goalSlice";
import Loader from "@components/loader/Loader";
import SignOutButton from "@components/signOutButton/SignOut";
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserSSR,
} from "next-firebase-auth";
import getUserDocId from "@utils/getUserDocId";

export function Goals() {
  console.log("Goals component rendered");
  const user = useAuthUser();
  console.log({ user });
  const goals = useAppSelector((state) => state.goalReducer.goals);
  const dispatch = useDispatch();
  const {
    data: goalsFromDB,
    isSuccess,
    isLoading,
    isError,
  } = useFetchGoalsQuery(getUserDocId(user.email, user.id));
  const debouncedGoals = useDebounce(goals, 200, { trailing: true });
  useSyncFirestoreDb(debouncedGoals[0], `${user.email}-${user.id}`);

  let content:
    | string
    | number
    | boolean
    | ReactFragment
    | JSX.Element
    | JSX.Element[]
    | null
    | undefined;

  useEffect(() => {
    console.log("Goals -> useEffect to sync backend to local state");
    dispatch(syncWithBackend(goalsFromDB));
    return () => {
      console.log(
        "cleaning up Goals -> useEffect to sync backend to local state"
      );
    };
  }, [dispatch, goalsFromDB]);

  if (isSuccess && goalsFromDB && goalsFromDB.length && goals && goals.length) {
    content = goals.map((goal) => {
      return <Goal key={goal.id} goal={goal} />;
    });
  } else if (isLoading) {
    content = <Loader />;
  } else if (isError) {
    content = (
      <ErrorLogger
        errorMessage={
          "It seems there is an issue. Please try to reload the page"
        }
      />
    );
  }
  return (
    <div className="goals">
      <SignOutButton />
      <h1 className="goals__h1">Goals</h1>
      <NewGoalButton />
      {content}
    </div>
  );
}

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  LoaderComponent: Loader,
})(Goals);

// export const getServerSideProps = withAuthUserSSR({
//   whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
// })();
