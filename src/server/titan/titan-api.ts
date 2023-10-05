async function uploadFile(file: File, metaData: unknown) {
  if (file.type !== "application/pdf") {
    throw new Error("Only pdfs allowed");
  }
  const url = "your_url";
  const bearertoken = "your_bearer_token";

  const formData = new FormData();
  formData.append("file", file);
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

  fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); // or response.text() if the response is not JSON
    })
    .then((data) => {
      console.log(data); // Handle the response data here
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}
