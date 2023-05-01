import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isGuest:
    typeof window !== "undefined"
      ? localStorage.getItem("isGuestSession")
      : false,
};

export const guestAccessSlice = createSlice({
  name: "guestAccessSlice",
  initialState,
  reducers: {
    isGuest: (state, action) => {
      state.isGuest = action.payload;
    },
  },
});

export const { isGuest } = guestAccessSlice.actions;
export default guestAccessSlice.reducer;
