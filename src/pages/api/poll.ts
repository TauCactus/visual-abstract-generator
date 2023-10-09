import type { NextApiRequest, NextApiResponse } from "next";
import { Redis } from "@upstash/redis";
import { AnyTemplate } from "@/mtg-templates/template-parser";

const redis = new Redis({
  url: process.env.redis_host!,
  token: process.env.redis_token!,
});
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AnyTemplate | string>,
) {
  const key = req.query.id;
  if (typeof key !== "string") {
    return res.status(400);
  }
  const data = await redis.json.get(key);
  if (!data) {
    return res.status(202).json("pending");
  }
  const result = AnyTemplate.safeParse(data);
  if (result.success) {
    return res.status(200).json(result.data);
  } else {
    console.error(result.error);
    return res.status(500).json("Error");
  }
}
