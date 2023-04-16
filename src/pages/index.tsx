import Layout from "@components/layout/Layout";
import Link from "next/link";
import { useAuthUser, withAuthUser } from "next-firebase-auth";

function Home() {
  const user = useAuthUser();

  let content;
  let route;
  let text;

  if (user.id) {
    route = "/goals";
    text = "Go to Goals page";
  } else {
    route = "/signin";
    text = "Sign in";
  }

  content = (
    <div className="flex justify-center">
      <Link
        className="self-center bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded"
        href={route}>
        {text}
      </Link>
    </div>
  );

  return <div className="home">{content}</div>;
}

export default withAuthUser({})(Home);
