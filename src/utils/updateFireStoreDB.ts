import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { GoalType } from "@types";

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
    }
    return "ok";
  } catch (err) {
    return { error: err };
  }
};

export default updateFirestoreDoc;
