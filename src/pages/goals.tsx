import Goal from "@components/goal/Goal";
import { GoalType } from "@types";
import NewGoalButton from "@components/newGoalButton/NewGoalButton";
import { useAppSelector } from "@redux/store";
import { useEffect } from "react";
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
import {
  collectionGroup,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";

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

  let content;

  content = goals?.map((goal: GoalType) => {
    return <Goal key={goal.id} goal={goal} />;
  });

  return (
    <div className="lg:ml-[200px] lg:mr-[200px]">
      {user.email && (
        <div className="flex items-baseline justify-end mb-6">
          <SignedInInfo email={user.email} />
          <SignOutButton />
        </div>
      )}
      <h1 className="text-2xl underline font-bold mb-8">Goals:</h1>
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
      userIdRef: goalObjectFromFirestore.userIdRef,
      timestamp: goalObjectFromFirestore.timestamp,
    };
  };

  let goalsFromDB: Array<GoalType> = [];

  try {
    const myGoalsRef = query(
      collectionGroup(db, "user-goals"),
      where("userIdRef", "==", AuthUser.id),
      orderBy("timestamp")
    );

    const querySnap = await getDocs(myGoalsRef);

    querySnap.forEach((doc: any) => {
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
