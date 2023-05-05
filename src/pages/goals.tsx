import Goal from "@components/goal/Goal";
import { GoalType } from "@types";
import NewGoalButton from "@components/newGoalButton/NewGoalButton";
import { useAppSelector } from "@store";
import { useEffect } from "react";
import { useDebounce } from "use-debounce";
import useSyncFirestoreDb from "@hooks/useSyncFirestoreDB";
import { useDispatch } from "react-redux";
import { resetGoals, syncWithBackend } from "@goalSlice";
import Loader from "@components/loader/Loader";
import SignOutButton from "@components/signOutButton/SignOutButton";
import {
  AuthAction,
  useAuthUser,
  verifyIdToken,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import getUserDocId from "@utils/getUserDocId";
import { auth, db } from "@firebase";
import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import firebase from "@firebase";
import log from "@utils/log";
import Head from "next/head";
import { MemoizedSignedInInfo } from "../components/signedInInfo/SignedInInfo";
import { isSubmitting } from "@formSlice";

export function Goals({ goalsFromDB }: any) {
  log("Goals page rendered");
  log({ goalsFromDB });

  const user = useAuthUser();
  const goals = useAppSelector((state) => state.goalReducer.goals);
  const dispatch = useDispatch();

  const debouncedGoals = useDebounce(goals, 200, { trailing: true });
  useSyncFirestoreDb(debouncedGoals[0], getUserDocId(user.email, user.id));

  useEffect(() => {
    log("Goals -> useEffect to sync backend to local state");
    dispatch(resetGoals());
    dispatch(syncWithBackend(goalsFromDB));
  }, [dispatch, goalsFromDB]);

  useEffect(() => {
    dispatch(isSubmitting(false));
  }, [dispatch]);

  // useEffect(() => {
  //   let n;
  //   if (!window.Notification) {
  //     log("Browser does not support notifications.");
  //   } else {
  //     log("Browser supports notifications");
  //     Notification.requestPermission()
  //       .then(function (p) {
  //         if (p === "granted") {
  //           n = new Notification("test");
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   }

  //   return () => (n = undefined);
  // }, []);

  const content = goals.map((goal: GoalType) => {
    return <Goal key={goal.id} goal={goal} />;
  });

  return (
    <>
      <Head>
        <title>Goals page</title>
      </Head>
      <div className="ml-auto mr-auto sm:max-w-[600px] md:max-w-[800px] lg:max-w-[960px] ">
        <div className="flex items-baseline justify-end mt-8 mb-6 h-24">
          {user.email && <MemoizedSignedInInfo email={user.email} />}
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
  whenAuthedBeforeRedirect: AuthAction.SHOW_LOADER,
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
    log({
      AuthUserFbUCreationTime: AuthUser.firebaseUser?.metadata.creationTime,
    });
    log({
      AuthUserFbUserLastSignInTime:
        AuthUser.firebaseUser?.metadata.lastSignInTime,
    });

    // const details = getAdditionalUserInfo()
    // console.log("details -> ", details);

    // check if is new user
    // if user first login
    //     -> create example goal
    // else
    //     -> don't do it, just go on with the rest of the page logic

    // if(isNewUser){createExampleGoal; postExampleGoalIntoFireStoreDB}
    // const exampleGoal = {
    //   title:
    //     "Goals page -> this is an example goal. You should start adding yours! :)",
    //   score: {
    //     max: 5,
    //     min: 0,
    //     actual: 0,
    //   },
    //   id: "exampleId",
    //   userIdRef: AuthUser.id,
    //   timestamp: Date.now(),
    // };

    // const exampleDocRef = doc(
    //   db,
    //   `/users/${getUserDocId(AuthUser.email, AuthUser.id)}/user-goals/${
    //     exampleGoal.id
    //   }`
    // );
    // await setDoc(exampleDocRef, exampleGoal, { merge: true });

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
