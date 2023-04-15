import { configureStore } from "@reduxjs/toolkit";
import goalReducer from "./slices/goalSlice";
import goalFormReducer from "./slices/goalFormSlice";
import { firestoreApi } from "./slices/goalsApi";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    goalFormReducer: goalFormReducer,
    [firestoreApi.reducerPath]: firestoreApi.reducer,
    goalReducer: goalReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(firestoreApi.middleware);
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
