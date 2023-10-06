import {z} from "zod";

const submitUrl = `${process.env.titan_host}/submit`;
const fetchUrl = (requestId: string)=> `${process.env.titan_host}/fetch?request_id=${requestId}`;
const bearertoken = process.env.titan_token!;

export async function uploadFileToTitan(file: Blob, filename: string, metaData: unknown) {
    const formData = new FormData();
    formData.append("file", file, filename);
    const jobConfig = JSON.stringify({
        extract: true,
        doc_class: true,
        fos: true,
    });
    const metadata = JSON.stringify(metaData);

    const headers = new Headers({
        Authorization: `Bearer ${bearertoken}`,
    });

    formData.append("job_config", jobConfig);
    formData.append("metadata", metadata);

    const requestOptions: RequestInit = {
        method: "POST",
        headers,
        body: formData,
    };

    const response = await fetch(submitUrl, requestOptions);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const json = await response.json();
    return TitanUploadResponse.parse(json);
}

export async function fetchTitan(requestId: string) {
    const headers = new Headers({
        Authorization: `Bearer ${bearertoken}`,
    });
    const response = await fetch(fetchUrl(requestId), {headers});
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const json = await response.json();
    return TitanFetchResponse.parse(json);
}

const TitanUploadResponse = z.object({
    request_id: z.string(),
    status: z.boolean(),
    message: z.string(),
});


const TitanFetchResponse = z.union([z.object({
    request_id: z.string(),
    status: z.literal(false),
    metadata: z.object({id: z.string()}),
}), z.object({
    status: z.literal(true),
    request_id: z.string(),
    metadata: z.object({id: z.string()}),
    data: z.object({
        url: z.string()
    })
})]);

export type TitanFetchResponse = z.infer<typeof TitanFetchResponse>