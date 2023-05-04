import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isGuest:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("isGuest") || "false")
      : undefined,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    isGuest: (state, action) => {
      state.isGuest = action.payload;
    },
  },
});

export const { isGuest } = userSlice.actions;
export default userSlice.reducer;
