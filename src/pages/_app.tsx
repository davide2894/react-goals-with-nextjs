import "@styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import initAuth from "@utils/initAuth";

export default function App({ Component, pageProps }: AppProps) {
  initAuth();

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
