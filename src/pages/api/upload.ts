import type { NextApiRequest, NextApiResponse } from "next";
import {
  adjectives,
  animals,
  uniqueNamesGenerator,
} from "unique-names-generator";
import { Redis } from "@upstash/redis";
import formidable from "formidable";
import { promises as fs } from "fs";

import {
  fetchTitan,
  TitanFetchResponse,
  uploadFileToTitan,
} from "@/server/titan/titan-api";
import { uploadFileToGcpBackend } from "@/server/gcp-backend";

type Data = { request_id: string };

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const form = formidable({});
  const [_, files] = await form.parse(req);
  if (!files.file?.[0]) {
    throw new Error("No file uploaded");
  }
  const file = files.file[0];
  const buffer = await fs.readFile(file.filepath);
  const blob = new Blob([buffer]);
  const response = await uploadFileToGcpBackend(blob, file.originalFilename!);

  res.status(200).json(response);
}
