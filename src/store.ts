import { configureStore } from "@reduxjs/toolkit";
import goalReducer from "@goalSlice";
import goalFormReducer from "@goalFormSlice";
import formReducer from "@formSlice";
import tourReducer from "@tourSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import log from "@utils/log";

const logger = (store: any) => (next: any) => (action: any) => {
  log("middleware --> dispatching", action);

  if (action.type === "tourSlice/setShowTour") {
    log("middleware -> setting tourSlice key into local storage");
    log(action.payload);
    localStorage.setItem("showTourLocalState", JSON.stringify(action.payload));
  }

  let result = next(action);
  log("middleware --> next state", store.getState());
  return result;
};

export const store = configureStore({
  reducer: {
    goalFormReducer: goalFormReducer,
    goalReducer: goalReducer,
    formReducer: formReducer,
    tourReducer: tourReducer,
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
