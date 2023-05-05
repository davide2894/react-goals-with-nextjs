import { configureStore } from "@reduxjs/toolkit";
import goalReducer from "@goalSlice";
import goalFormReducer from "@goalFormSlice";
import formReducer from "@formSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    goalFormReducer: goalFormReducer,
    goalReducer: goalReducer,
    formReducer: formReducer,
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
