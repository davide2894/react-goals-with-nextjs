import { db } from "@firebase";
import { GoalType } from "@types";
import {
  query,
  collectionGroup,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { AuthUser } from "next-firebase-auth";
import log from "./log";
import mapFirestoreGoalObject from "./mapFirestoreGoalObject";

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
  } catch (error) {
    if (error instanceof Error) log(error.message);
  }

  return goalsFromDB;
}
