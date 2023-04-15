import Layout from "@components/layout/Layout";
import Link from "next/link";
import { useAuthUser, withAuthUser } from "next-firebase-auth";

function Home() {
  const user = useAuthUser();

  let content;

  if (user.id) {
    content = (
      <div>
        <Link href={"/goals"}>Go to Goals page</Link>
      </div>
    );
  } else {
    content = (
      <div>
        <Link href={"/signin"}>Sign in</Link>
      </div>
    );
  }

  return (
    <Layout>
      <div className="home">{content}</div>
    </Layout>
  );
}

export default withAuthUser({})(Home);
