import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const updateFirestoreDoc = async (userDocId, goal, type) => {
  const docRef = doc(db, `/users/${userDocId}/user-goals/`, goal.id);
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
