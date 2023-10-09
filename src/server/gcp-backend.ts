import z from "zod";

const GCPBackendResponse = z.object({
  request_id: z.string(),
  status: z.string(),
});
export async function uploadFileToGcpBackend(file: Blob, filename: string) {
  const formData = new FormData();
  formData.append("file", file, filename);

  const headers = new Headers();
  headers.append("authorization", "test");

  const requestOptions: RequestInit = {
    method: "POST",
    headers,
    body: formData,
  };
  const response = await fetch(
    "http://35.224.199.191:8080/process_pdf_async",
    requestOptions,
  );
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const json = await response.json();
  return GCPBackendResponse.parse(json);
}
