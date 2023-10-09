import { useMutation } from "react-query";
import z from "zod";

const UploadResponse = z.object({ imageUrl: z.string(), id: z.string() });

export const useUpload = () => {
  return useMutation({
    mutationKey: ["upload"],
    mutationFn: async (file : File) => {
        const formData = new FormData();
        formData.append('file', file);
        const result = await fetch("http://35.224.199.191:8080/process_pdf_async",  {
            method: 'POST',
            body: formData,
            headers: {
                authorization: 'bearer test'
            }
        })
        const resultJson = await result.json()
        console.log(resultJson);
        return UploadResponse.parse(resultJson);
    },
  });
};
