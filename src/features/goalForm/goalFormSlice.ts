import { createSlice } from "@reduxjs/toolkit";
import { GoalFormData } from "@types";

const initialState = {
  show: false,
  goalTitle: "",
  goalScore: "",
} as GoalFormData;

export const goalFormSlice = createSlice({
  name: "goalFormSlice",
  initialState,
  reducers: {
    showForm: (state) => {
      state.show = true;
    },
    hideForm: (state) => {
      state.show = false;
    },
  },
});

export const { showForm, hideForm } = goalFormSlice.actions;
export default goalFormSlice.reducer;
