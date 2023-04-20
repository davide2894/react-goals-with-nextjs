import "@styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "@redux/store";
import { Provider } from "react-redux";
import initAuth from "@utils/initAuth";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import Layout from "@components/layout/Layout";
import { initFirebase } from "@firebase";

initFirebase();
initAuth();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
