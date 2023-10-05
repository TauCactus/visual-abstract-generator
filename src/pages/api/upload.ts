import type {NextApiRequest, NextApiResponse} from "next";
import {adjectives, animals, uniqueNamesGenerator} from "unique-names-generator";
import {Redis} from "@upstash/redis";
import formidable from 'formidable';

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
    const [fields, files] = await form.parse(req);
    console.log(fields, files);
    const id = uniqueNamesGenerator({
        style: 'lowerCase',
        separator: '-',
        length: 3,
        dictionaries: [adjectives, adjectives, animals]
    });

    await redis.set(id, {name: "empty"});
    await sleep(3000);
    res.status(200).json({host: process.env.DB_HOST!, id, imageUrl: "/example-abstract.png"});
}
