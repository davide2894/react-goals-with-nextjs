import Goal from "@components/goal/Goal";
import { GoalType } from "../types";
//TODO tailwind -> import "./Goals.scss";
import NewGoalButton from "@components/newGoalButton/NewGoalButton";
import { useAppSelector } from "@redux/store";
import { ReactFragment, useEffect } from "react";
import { useDebounce } from "use-debounce";
import useSyncFirestoreDb from "@utils/useSyncFirestoreDB";
import { useDispatch } from "react-redux";
import { syncWithBackend } from "@redux/slices/goalSlice";
import Loader from "@components/loader/Loader";
import SignOutButton from "@components/signOutButton/SignOut";
import SignedInInfo from "@components/signedInInfo/SignedInInfo";

import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import getUserDocId from "@utils/getUserDocId";
import { db } from "@firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export function Goals({ goalsFromDB }: any) {
  console.log("Goals page rendered");
  console.log(goalsFromDB);
  const user = useAuthUser();
  const goals = useAppSelector((state) => state.goalReducer.goals);
  const dispatch = useDispatch();
  const debouncedGoals = useDebounce(goals, 200, { trailing: true });
  useSyncFirestoreDb(debouncedGoals[0], getUserDocId(user.email, user.id));

  useEffect(() => {
    console.log("Goals -> useEffect to sync backend to local state");

    dispatch(syncWithBackend(goalsFromDB));

    return () => {
      console.log(
        "cleaning up Goals -> useEffect to sync backend to local state"
      );
    };
  }, [dispatch, goalsFromDB]);

  let content:
    | string
    | number
    | boolean
    | ReactFragment
    | JSX.Element
    | JSX.Element[]
    | null
    | undefined;

  if (goalsFromDB && goalsFromDB.length && goals && goals.length) {
    content = goals.map((goal) => {
      return <Goal key={goal.id} goal={goal} />;
    });
  }

  return (
    <div className="goals">
      {user.email && <SignedInInfo email={user.email} />}
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

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser }) => {
  const mapGoal = (goalObjectFromFirestore: GoalType) => {
    return {
      title: goalObjectFromFirestore.title,
      score: goalObjectFromFirestore.score,
      id: goalObjectFromFirestore.id,
    };
  };

  let goalsFromDB: Array<GoalType> = [];

  try {
    const goalsCollectionRef = collection(
      db,
      `/users/${getUserDocId(AuthUser.email, AuthUser.id)}/user-goals/`
    );
    const querySnapshot = await getDocs(
      query(goalsCollectionRef, orderBy("title", "asc"))
    );

    querySnapshot.forEach((doc) => {
      goalsFromDB.push(mapGoal(doc.data() as GoalType));
    });
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }

  return {
    props: {
      goalsFromDB,
    },
  };
});
