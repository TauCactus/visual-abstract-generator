import { useMutation, useQuery } from "react-query";
import z from "zod";
import { AnyTemplate } from "@/mtg-templates/template-parser";

const GCPBackendResponse = z.object({
  request_id: z.string(),
  status: z.string(),
});
export const useUpload = () => {
  return useMutation({
    mutationKey: ["upload"],
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      const headers = new Headers();
      headers.append("Authorization", "test");
      const result = await fetch(
        //"http://35.224.199.191:8080/process_pdf_async",
        "/api/upload",
        {
          method: "POST",
          body: formData,
          headers,
        },
      );
      const resultJson = await result.json();
      return GCPBackendResponse.parse(resultJson);
    },
  });
};

export const usePolling = (id?: string) => {
  return useQuery({
    queryKey: ["poll", id],
    enabled: Boolean(id),
    refetchOnWindowFocus: false,
    refetchInterval: (result) => {
      if (result && result.status === "pending") {
        return 5000;
      }
      return false;
    },
    queryFn: async () => await pollQuery(id),
  });
};

async function pollQuery(
  id?: string,
): Promise<
  | { status: "ready"; template: AnyTemplate }
  | { status: "pending" }
  | { status: "failed" }
> {
  const fetched = await fetch(`/api/poll?id=${id}`);
  if (fetched.status === 200) {
    const json = await fetched.json();
    return { status: "ready", template: AnyTemplate.parse(json) };
  } else if (fetched.status === 202) {
    return { status: "pending" };
  } else {
    return { status: "failed" };
  }
}
