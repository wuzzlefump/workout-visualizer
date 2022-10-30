import type { NextApiRequest, NextApiResponse } from "next";
import sanityClient from "@sanity/client";

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.Node_ENV === "production",
  token: process.env.SANITY_API_TOKEN,
};
const client = sanityClient(config);

export default async function createLike(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { key } = JSON.parse(req.body);

  try {
    await client.delete(key);
  } catch (e) {
    return res.status(500).json({ message: "Couldn't remove like", e });
  }

  return res.status(200).json({ message: "like submitted" });
}
