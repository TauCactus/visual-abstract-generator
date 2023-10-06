import type {NextApiRequest, NextApiResponse} from "next";
import {adjectives, animals, uniqueNamesGenerator} from "unique-names-generator";
import {Redis} from "@upstash/redis";
import formidable from 'formidable';
import {promises as fs} from 'fs';

import {fetchTitan, TitanFetchResponse, uploadFileToTitan} from "@/server/titan/titan-api"

const redis = new Redis({
    url: process.env.redis_host!,
    token: process.env.redis_token!,
})

type Data = {
    imageUrl: string;
    id: string;
    host: string;
};

const sleep = (milliseconds: number) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

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
    const id = uniqueNamesGenerator({
        style: 'lowerCase',
        separator: '-',
        length: 3,
        dictionaries: [adjectives, adjectives, animals]
    });
    if (!files.file?.[0]) {
        throw new Error("No file uploaded");
    }
    const file = files.file[0];
    const buffer = await fs.readFile(file.filepath)
    const blob = new Blob([buffer]);
    const response = await uploadFileToTitan(blob, file.originalFilename!, {id: id});


    let fetchResponse: TitanFetchResponse | null = null;
    while (!(fetchResponse?.status ?? false)) {
        await sleep(2000);
        fetchResponse = await fetchTitan(response.request_id);
    }
    console.log("get response", fetchResponse);
    if(!fetchResponse || !fetchResponse.status) {
        throw new Error("Something is wrong");
    }
    const result = await fetch(fetchResponse.data.url);
    const json = await result.json();
    console.log(json)
    await redis.set(id, {name: "empty", json});

    res.status(200).json({host: process.env.DB_HOST!, id, imageUrl: "/example-abstract.png"});
}
