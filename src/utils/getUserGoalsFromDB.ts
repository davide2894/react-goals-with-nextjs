import { db } from "@firebase";
import { GoalType } from "@types";
import {
  query,
  collectionGroup,
  where,
  orderBy,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import { AuthUser } from "next-firebase-auth";
import log from "./log";
import mapFirestoreGoalObject from "./mapFirestoreGoalObject";
import getUserDocId from "./getUserDocId";

export default async function getUserGoalsFromDB(authUser: AuthUser) {
  let goalsFromDB: Array<GoalType> = [];

  try {
    const myGoalsRef = query(
      collectionGroup(db, "user-goals"),
      where("userIdRef", "==", authUser.id),
      orderBy("timestamp")
    );

    (await getDocs(myGoalsRef)).forEach((doc: any) => {
      goalsFromDB.push(mapFirestoreGoalObject(doc.data() as GoalType));
    });

    if (!goalsFromDB.length) {
      const exampleGoal = await createExampleGoal(authUser);
      goalsFromDB.push(exampleGoal);
    }
  } catch (error) {
    if (error instanceof Error) log(error.message);
  }

  return goalsFromDB;
}

const createExampleGoal = async (user: AuthUser) => {
  const exampleGoal = {
    title: "This is an example goal. You should start adding yours! :)",
    score: {
      max: 5,
      min: 0,
      actual: 0,
    },
    id: "exampleId",
    userIdRef: user.id,
    timestamp: Date.now(),
  };

  const exampleDocRef = doc(
    db,
    `/users/${getUserDocId(user.email, user.id)}/user-goals/${exampleGoal.id}`
  );
  log("Firebase.ts file -> creating example goal for new user");
  await setDoc(exampleDocRef, exampleGoal, { merge: true });
  log("Firebase.ts file -> created example goal for new user");
  log({ newUserGoal: exampleGoal });
  return exampleGoal;
};
