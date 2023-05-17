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
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import getUserDocId from "@utils/getUserDocId";
import log from "@utils/log";
import Head from "next/head";
import { MemoizedSignedInInfo } from "../components/signedInInfo/SignedInInfo";
import { isSubmitting } from "@formSlice";
import getUserGoalsFromDB from "@utils/getUserGoalsFromDB";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTour } from "@reactour/tour";
import { setShowTour } from "@tourSlice";

export function Goals({ goalsFromDB }: any) {
  log("Goals page rendered");
  log({ goalsFromDB });

  const user = useAuthUser();
  const goals = useAppSelector((state) => state.goalReducer.goals);
  const tour = useAppSelector((state) => state.tourReducer.showTour);
  const dispatch = useDispatch();
  const debouncedGoals = useDebounce(goals, 200, { trailing: true });
  const { setIsOpen, isOpen } = useTour();

  useSyncFirestoreDb(debouncedGoals[0], getUserDocId(user.email, user.id));

  useEffect(() => {
    log("Goals -> useEffect to sync backend to local state");
    dispatch(resetGoals());
    dispatch(syncWithBackend(goalsFromDB));
  }, [dispatch, goalsFromDB]);

  useEffect(() => {
    dispatch(isSubmitting(false));
  }, [dispatch]);

  useEffect(() => {
    let showTourLocalState = JSON.parse(
      localStorage.getItem("showTourLocalState") || "true"
    );
    if (showTourLocalState) {
      dispatch(setShowTour(true));
    } else {
      dispatch(setShowTour(false));
    }
  }, [dispatch]);

  useEffect(() => {
    if (tour) {
      setIsOpen(true);
    }
  }, [setIsOpen, tour]);

  useEffect(() => {
    if (!isOpen) {
      dispatch(setShowTour(false));
    }
  }, [dispatch, isOpen]);

  const content = goals.map((goal: GoalType) => {
    return <Goal key={goal.id} goal={goal} />;
  });

  return (
    <>
      <Head>
        <title>Goals page</title>
      </Head>
      <div className="ml-auto mr-auto sm:max-w-[600px] md:max-w-[800px] lg:max-w-[960px]">
        <ToastContainer
          draggable={false}
          closeOnClick
          pauseOnHover
          autoClose={false}
          position="bottom-left"
          className="toast-position"
        />
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
  let goalsFromDB = await getUserGoalsFromDB(AuthUser);

  return {
    props: {
      goalsFromDB,
    },
  };
});
