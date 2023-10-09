import type {NextApiRequest, NextApiResponse} from "next";
import {adjectives, animals, uniqueNamesGenerator} from "unique-names-generator";
import {Redis} from "@upstash/redis";
import formidable from 'formidable';
import {promises as fs} from 'fs';

import {fetchTitan, TitanFetchResponse, uploadFileToTitan} from "@/server/titan/titan-api"
import {templateFour, TemplateFourForm} from "@/mtg-templates/template-4/template-four-form";
import {TemplateThreeForm} from "@/mtg-templates/template-3/template-three-form";
import {union, z} from "zod";
import {TemplateOneForm} from "@/mtg-templates/template-1/template-one-form";
import {TemplateSevenForm} from "@/mtg-templates/template-7/template-seven-form";
const redis = new Redis({
    url: process.env.redis_host!,
    token: process.env.redis_token!,
})

type Data = {
    imageUrl: string;
    id: string;
    host: string;
};

const TemplateOneWithIdentifier = TemplateOneForm.merge(z.object({template: z.literal('Template-1')}));
const TemplateThreeWithIdentifier  = TemplateThreeForm.merge(z.object({template: z.literal('Template-3')}));
const TemplateFourWithIdentifier  = TemplateFourForm.merge(z.object({template: z.literal('Template-4')}));
const TemplateSevenWithIdentifier  = TemplateSevenForm.merge(z.object({template: z.literal('Template-7')}));

const AnyTemplate = z.union([TemplateOneWithIdentifier, TemplateThreeWithIdentifier, TemplateFourWithIdentifier, TemplateSevenWithIdentifier])

const sleep = (milliseconds: number) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    const key = req.query.id;
    if(typeof key !== 'string') {
        return res.status(400);
    }
    const data = await redis.get(key);
}
