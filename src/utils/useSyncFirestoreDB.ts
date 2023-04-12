import { useEffect } from "react";
import usePrevious from "./usePrevious";
import getDifference from "./getDifference";
import updateFirestoreDoc from "./updateFireStoreDB";

const useSyncFirestoreDb = (goals, userDocId) => {
  const previousGoals = usePrevious(goals);

  useEffect(() => {
    console.log("useSyncFirestoreDb effect");
    const isDiff = JSON.stringify(previousGoals) !== JSON.stringify(goals);

    if (
      isDiff &&
      typeof previousGoals !== "undefined" &&
      goals &&
      goals.length
    ) {
      const diffResult = getDifference(goals, previousGoals);
      console.log("updating user goal");
      updateFirestoreDoc(
        userDocId,
        diffResult.goalToReturn,
        diffResult.typeOfDifference
      );
    }
    return () => {
      console.log("cleanup");
    };
  }, [goals, previousGoals, userDocId]);
};

export default useSyncFirestoreDb;
