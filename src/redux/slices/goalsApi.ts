// src/features/scores/scoresSlice.ts
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  collection,
  doc,
  updateDoc,
  getDocs,
  setDoc,
  increment,
  deleteDoc,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";
import { Goal } from "../../types";

const mapGoal = (goalObjectFromFirestore): Goal => {
  return {
    title: goalObjectFromFirestore.title,
    score: goalObjectFromFirestore.score,
    id: goalObjectFromFirestore.id,
  };
};

export const firestoreApi = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Goals"],
  endpoints: (builder) => ({
    fetchGoals: builder.query({
      async queryFn(user) {
        try {
          console.log("goals api - fetching goals from DB");
          let goalsFromDB: Array<Goal> = [];
          const goalsCollectionRef = collection(
            db,
            `/users/${user.userDocId}/user-goals/`
          );
          const querySnapshot = await getDocs(
            query(goalsCollectionRef, orderBy("title", "asc"))
          );
          querySnapshot.forEach((doc) => {
            goalsFromDB.push(mapGoal(doc.data()));
          });
          return { data: goalsFromDB };
        } catch (error) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      providesTags: ["Goals"],
    }),
  }),
});

export const { useFetchGoalsQuery } = firestoreApi;
