import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSubmitting: false,
};

export const formSlice = createSlice({
  name: "formSlice",
  initialState,
  reducers: {
    isSubmitting: (state, action) => {
      state.isSubmitting = action.payload;
    },
  },
});

export const { isSubmitting } = formSlice.actions;
export default formSlice.reducer;
