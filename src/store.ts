import { configureStore } from "@reduxjs/toolkit";
import goalReducer from "@goalSlice/goalSlice";
import goalFormReducer from "@goalFormSlice/goalFormSlice";
import guestAccessReducer from "@guestAccessSliceguestAccessSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    goalFormReducer: goalFormReducer,
    goalReducer: goalReducer,
    guestAccessReducer: guestAccessReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware();
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
