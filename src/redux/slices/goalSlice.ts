import { createSlice } from "@reduxjs/toolkit";
import { Goal } from "../../types";

let goals: Array<Goal> = [];

let initialState = { goals };

export const goalSlice = createSlice({
  name: "goalsSlice",
  initialState: initialState,
  reducers: {
    addGoal: (state, action) => {
      state.goals.push(action.payload);
    },
    updateGoal: (state, action) => {
      const goalToUpdate = state.goals.find(
        (goal) => goal.id === action.payload.id
      );
      if (goalToUpdate) {
        goalToUpdate.title = action.payload.title;
        goalToUpdate.score.max = action.payload.score.max;
      }
    },
    incrementScore: (state, action) => {
      const goalToUpdate = state.goals.find(
        (goal) => goal.id === action.payload.id
      );

      if (goalToUpdate) {
        goalToUpdate.score.actual += 1;
      }
    },
    decrementScore: (state, action) => {
      const goalToUpdate = state.goals.find(
        (goal) => goal.id === action.payload.id
      );

      if (goalToUpdate) {
        goalToUpdate.score.actual -= 1;
      }
    },
    deleteGoal: (state, action) => {
      const goalToUpdate = state.goals.find(
        (goal) => goal.id === action.payload.id
      );
      if (goalToUpdate) {
        state.goals = state.goals.filter((el) => el.id !== goalToUpdate.id);
      }
    },
    resetGoal: (state, action) => {
      const goalToUpdate = state.goals.find(
        (goal) => goal.id === action.payload.id
      );
      if (goalToUpdate) {
        goalToUpdate.score.actual = 0;
      }
    },
    syncWithBackend: (state, action) => {
      state.goals = action.payload;
    },
  },
});

export const {
  addGoal,
  updateGoal,
  deleteGoal,
  resetGoal,
  incrementScore,
  decrementScore,
  syncWithBackend,
} = goalSlice.actions;
export default goalSlice.reducer;
