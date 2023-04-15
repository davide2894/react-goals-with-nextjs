import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import goalFormReducer from "../redux/slices/goalFormSlice";
import userReducer from "../redux/slices/_delete_userSlice";
import { firestoreApi } from "../redux/slices/goalsApi";
import { Provider } from "react-redux";

//sources:
// - https://www.freecodecamp.org/news/how-to-write-unit-tests-in-react-redux/#-how-to-perform-testing-with-the-react-redux-toolkit
// - https://redux.js.org/usage/writing-tests#setting-up-a-reusable-test-render-function
export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: {
        goalFormReducer: goalFormReducer,
        userReducer: userReducer,
        [firestoreApi.reducerPath]: firestoreApi.reducer,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
