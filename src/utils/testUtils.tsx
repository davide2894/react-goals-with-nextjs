import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { Store, configureStore } from "@reduxjs/toolkit";
import goalReducer from "@goalSlice";
import goalFormReducer from "@goalFormSlice";
import formReducer from "@formSlice";
import type { PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { RootState } from "@store";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: Store;
}
//sources:
// - https://www.freecodecamp.org/news/how-to-write-unit-tests-in-react-redux/#-how-to-perform-testing-with-the-react-redux-toolkit
// - https://redux.js.org/usage/writing-tests#setting-up-a-reusable-test-render-function
export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {
      goalFormReducer: {
        show: false,
        goalTitle: "goal title example",
        goalScore: "0",
      },
      goalReducer: {
        goals: [
          {
            title: "goal title example",
            score: {
              max: 0,
              min: 0,
              actual: 0,
            },
            id: "explampleId",
            userIdRef: "exampleUserIdRef",
            timestamp: Date.now(),
          },
        ],
      },
      formReducer: {
        isSubmitting: false,
      },
    },
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: {
        goalReducer: goalReducer,
        goalFormReducer: goalFormReducer,
        formReducer: formReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
