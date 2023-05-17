import "@styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "@store";
import { Provider } from "react-redux";
import initAuth from "@utils/initAuth";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import Layout from "@components/layout/Layout";
import { initFirebase } from "@firebase";
import { TourProvider } from "@reactour/tour";
import { steps, styles } from "@utils/tourConfigs";

initFirebase();
initAuth();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <TourProvider
        steps={steps}
        styles={styles}
        onClickClose={({ setIsOpen }) => {
          setIsOpen(false);
        }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </TourProvider>
    </Provider>
  );
}
