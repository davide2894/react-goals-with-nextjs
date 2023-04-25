import { createSlice } from "@reduxjs/toolkit";
import { GoalType } from "@types";
import { WritableDraft } from "immer/dist/internal";

let goals: Array<GoalType> = [];

let initialState = { goals };

const getGoalToUpdate = (
  state: WritableDraft<{ goals: GoalType[] }>,
  action: { payload: any; type?: string }
) => {
  return state.goals.find((goal: GoalType) => goal.id === action.payload.id);
};

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
    updateGoalTitle: (state, action) => {
      const goalToUpdate = state.goals.find(
        (goal) => goal.id === action.payload.goal.id
      );

      if (goalToUpdate) {
        goalToUpdate.title = action.payload.editableTitleValue;
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
      const goalToUpdate = getGoalToUpdate(state, action);
      if (goalToUpdate) {
        goalToUpdate.score.actual = 0;
      }
    },
    syncWithBackend: (state, action) => {
      state.goals = action.payload;
    },
    resetGoals: (state) => {
      state.goals = [];
    },
  },
});

export const {
  addGoal,
  updateGoal,
  updateGoalTitle,
  deleteGoal,
  resetGoal,
  incrementScore,
  decrementScore,
  syncWithBackend,
  resetGoals,
} = goalSlice.actions;
export default goalSlice.reducer;
