import { useMutation } from "react-query";
import z from "zod";

const UploadResponse = z.object({ imageUrl: z.string() });

export const useUpload = () => {
  return useMutation({
    mutationKey: ["upload"],
    mutationFn: async () => {
        const result = await fetch("/api/upload", { method: "post" })
        const resultJson = await result.json()
        return UploadResponse.parse(resultJson);
    },
  });
};
