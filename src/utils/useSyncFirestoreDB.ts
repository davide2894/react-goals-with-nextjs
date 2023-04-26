import { useEffect } from "react";
import usePrevious from "./usePrevious";
import getDifference from "./getDifference";
import updateFirestoreDoc from "./updateFireStoreDB";
import { GoalType, UserDocId } from "@types";
import log from "@utils/log";

const useSyncFirestoreDb = (goals: Array<GoalType>, userDocId: UserDocId) => {
  const previousGoals = usePrevious(goals);

  useEffect(() => {
    log("useSyncFirestoreDb effect");
    const isDiff = JSON.stringify(previousGoals) !== JSON.stringify(goals);

    if (isDiff && typeof previousGoals !== "undefined" && userDocId) {
      const diffResult = getDifference(goals, previousGoals);
      log("updating user goal");
      updateFirestoreDoc(
        userDocId,
        diffResult.goalToReturn,
        diffResult.typeOfDifference
      );
    }
    return () => {
      log("cleanup");
    };
  }, [goals, previousGoals, userDocId]);
};

export default useSyncFirestoreDb;
