import { configureStore } from "@reduxjs/toolkit";
import goalReducer from "@goalSlice";
import goalFormReducer from "@goalFormSlice";
import userReducer from "@userSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import log from "@utils/log";

const logger = (store: any) => (next: any) => (action: any) => {
  log("middleware --> dispatching", action);

  if (action.type === "userSlice/isGuest") {
    log("middleware -> setting isGuestSesson key insto local storage");
    localStorage.setItem("isGuest", action.payload.toString());
  }

  let result = next(action);
  log("middleware --> next state", store.getState());
  return result;
};

export const store = configureStore({
  reducer: {
    goalFormReducer: goalFormReducer,
    goalReducer: goalReducer,
    userReducer: userReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(logger);
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
