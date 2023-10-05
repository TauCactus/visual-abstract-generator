import { useMutation } from "react-query";
import z from "zod";

const UploadResponse = z.object({ imageUrl: z.string(), id: z.string() });

export const useUpload = () => {
  return useMutation({
    mutationKey: ["upload"],
    mutationFn: async (file : File) => {
        const formData = new FormData();
        formData.append('file', file);
        const result = await fetch("/api/upload",  {
            method: 'POST',
            body: formData,
        })
        const resultJson = await result.json()
        return UploadResponse.parse(resultJson);
    },
  });
};
