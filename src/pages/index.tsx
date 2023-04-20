import Link from "next/link";
import { withAuthUserTokenSSR } from "next-firebase-auth";

function Home(props: { route: string; text: string }) {
  return (
    <div className="home">
      <div className="flex justify-center mt-10">
        <Link
          className="self-center bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded"
          href={props.route}>
          {props.text}
        </Link>
      </div>
    </div>
  );
}

export const getServerSideProps = withAuthUserTokenSSR({})(
  async ({ AuthUser }) => {
    const user = AuthUser;

    let route;
    let text;

    if (user.id) {
      route = "/goals";
      text = "Go to Goals page";
    } else {
      route = "/signin";
      text = "Sign in";
    }

    return {
      props: {
        route,
        text,
      },
    };
  }
);

export default Home;
