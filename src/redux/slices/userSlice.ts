import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";

const initialState = {
  user: {
    email: "",
    uid: "",
    userDocId: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = {
        email: "",
        uid: "",
        userDocId: "",
      };
    },
  },
});

export const { login, logout } = userSlice.actions;

// selectors
export const selectUser = (state) => state.user.user;
//   const posts = useSelector((state) => state.posts);
export default userSlice.reducer;
