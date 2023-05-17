import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showTour:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("showTourLocalState") || "true")
      : undefined,
};

export const tourSlice = createSlice({
  name: "tourSlice",
  initialState,
  reducers: {
    setShowTour: (state, action) => {
      state.showTour = action.payload;
    },
  },
});

export const { setShowTour } = tourSlice.actions;
export default tourSlice.reducer;
