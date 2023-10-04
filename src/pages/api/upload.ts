// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  imageUrl: string;
};

const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  await sleep(3000);
  res.status(200).json({ imageUrl: "/example-abstract.png" });
}
