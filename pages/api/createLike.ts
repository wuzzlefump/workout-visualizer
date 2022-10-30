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
  const { user, workout } = JSON.parse(req.body);

  try {
    await client.create({
      _type: "like",
      workout: {
        _type: "reference",
        _ref: workout,
      },
      user: {
        _type: "reference",
        _ref: user,
      },
    });
  } catch (e) {
    return res.status(500).json({ message: "Couldn't submit like", e });
  }

  return res.status(200).json({ message: "like submitted" });
}
