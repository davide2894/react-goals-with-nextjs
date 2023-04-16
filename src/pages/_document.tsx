import Layout from "@components/layout/Layout";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="min-h-screen font-sans">
        <Layout>
          <Main />
          <NextScript />
        </Layout>
      </body>
    </Html>
  );
}
