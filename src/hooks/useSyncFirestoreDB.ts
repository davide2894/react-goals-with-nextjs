import { useEffect } from "react";
import usePrevious from "@hooks/usePrevious";
import getDifference from "@utils/getDifference";
import updateFirestoreDoc from "@utils/updateFireStoreDB";
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
  }, [goals, previousGoals, userDocId]);
};

export default useSyncFirestoreDb;
