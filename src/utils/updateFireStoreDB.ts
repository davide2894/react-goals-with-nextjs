import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { GoalType } from "@types";
import log from "./log";

const updateFirestoreDoc = async (
  userDocId: string,
  goal: GoalType,
  type: string
) => {
  const docRef = doc(db, `/users/${userDocId}/user-goals/${goal.id}`);
  try {
    if (type === "deleted") {
      await deleteDoc(docRef);
    } else {
      await setDoc(docRef, goal, { merge: true });
      log("setDoc for new user");
    }
  } catch (err) {
    return { error: err };
  }
};

export default updateFirestoreDoc;
