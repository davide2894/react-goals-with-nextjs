import Goal from "@components/goal/Goal";
import { GoalType } from "@types";
import NewGoalButton from "@components/newGoalButton/NewGoalButton";
import { useAppSelector } from "@store";
import { useEffect } from "react";
import { useDebounce } from "use-debounce";
import useSyncFirestoreDb from "@hooks/useSyncFirestoreDB";
import { useDispatch } from "react-redux";
import { syncWithBackend } from "@goalSlice/goalSlice";
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
import {
  collectionGroup,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import log from "@utils/log";
import Head from "next/head";

export function Goals({ goalsFromDB }: any) {
  log("Goals page rendered");
  log("env: " + process.env.NODE_ENV);
  log(goalsFromDB);

  const user = useAuthUser();
  const goals = useAppSelector((state) => state.goalReducer.goals);
  const dispatch = useDispatch();
  const debouncedGoals = useDebounce(goals, 200, { trailing: true });
  useSyncFirestoreDb(debouncedGoals[0], getUserDocId(user.email, user.id));

  useEffect(() => {
    log("Goals -> useEffect to sync backend to local state");

    dispatch(syncWithBackend(goalsFromDB));
  }, [dispatch, goalsFromDB]);

  const content = goals.map((goal: GoalType) => {
    return <Goal key={goal.id} goal={goal} />;
  });

  return (
    <>
      <Head>
        <title>Goals page</title>
      </Head>
      <div className="lg:ml-[200px] lg:mr-[200px]">
        <div className="flex items-baseline justify-end mb-6">
          {user.email && <SignedInInfo email={user.email} />}
          <SignOutButton />
        </div>
        <h1 className="text-2xl underline font-bold mb-8">Goals:</h1>
        <NewGoalButton />
        {content}
      </div>
    </>
  );
}

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenAuthed: AuthAction.RENDER,
  LoaderComponent: Loader,
})(Goals);

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser }) => {
  log("goals page - ssr pre-render");
  const mapGoal = (goalObjectFromFirestore: GoalType) => {
    return {
      title: goalObjectFromFirestore.title,
      score: goalObjectFromFirestore.score,
      id: goalObjectFromFirestore.id,
      userIdRef: goalObjectFromFirestore.userIdRef,
      timestamp: goalObjectFromFirestore.timestamp,
    };
  };

  let goalsFromDB: Array<GoalType> = [];

  try {
    log("goals page - ssr pre-render --> AuthUser");
    log({ AuthUser });

    const myGoalsRef = query(
      collectionGroup(db, "user-goals"),
      where("userIdRef", "==", AuthUser.id),
      orderBy("timestamp")
    );

    (await getDocs(myGoalsRef)).forEach((doc: any) => {
      goalsFromDB.push(mapGoal(doc.data() as GoalType));
    });

    // case 1: regged user lands with no goals, new reg -> create dummy goal
    // case 2: regged user lands with no goals, no new reg -> don't do anything
    // casw 3: regged user lands with already goals -> don't do anything
  } catch (error) {
    if (error instanceof Error) log(error.message);
  }

  return {
    props: {
      goalsFromDB,
    },
  };
});
