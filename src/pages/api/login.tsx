import { setAuthCookies } from "next-firebase-auth";
import initAuth from "@utils/initAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { log } from "console";

initAuth();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    log("login api -> before setAuthCookies");
    await setAuthCookies(req, res);
    log("login api -> before setAuthCookies");
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return res.status(500).json({ error: "Unexpected error." });
  }
  return res.status(200).json({ status: true });
};

export default handler;
