import Head from "next/head";
import { useEffect, useState } from "react";
import { templateOne } from "@/mtg-templates/template-1/template-one-form";
import { Template } from "@/mtg-templates/template";
import { Box, Button, Stack } from "@mui/material";
import { templateThree } from "@/mtg-templates/template-3/template-three-form";
import { templateFour } from "@/mtg-templates/template-4/template-four-form";
import dynamic from "next/dynamic";
import { templateSeven } from "@/mtg-templates/template-7/template-seven-form";

const templates = [templateOne, templateThree, templateFour, templateSeven];
const DynamicCanvas = dynamic(() => import("../components/fabric-canvas"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
export default function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState(templateThree);
  const [data, setData] = useState(selectedTemplate.sampleInput);
  const [error, setError] = useState("");
  const [json, setJson] = useState(() => {
    const result = selectedTemplate.buildJson(data);
    if (result.success) {
      return result.json;
    } else {
      throw new Error("All wrong :(");
    }
  });
  useEffect(() => {
    selectedTemplate.prepareInput(data).then((preparedData) => {
      const result = selectedTemplate.buildJson(preparedData);
      if (result.success) {
        setError("");
        setJson(result.json);
      } else {
        setError(result.error);
      }
    });
  }, [data]);

  const changeTemplate = (nextTemplate: Template<any>) => {
    setSelectedTemplate(nextTemplate);
    const nextData = nextTemplate.sampleInput;
    setData(nextData);
    const result = nextTemplate.buildJson(nextData);
    if (result.success) {
      setJson(result.json);
    } else {
      throw new Error("All wrong :(");
    }
  };

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Francois+One&family=Nunito:wght@400;700&family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <title>Visual Abstract Generator</title>
      </Head>
      <Stack
        spacing={4}
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ padding: 4 }}
      >
        <div>
          {templates.map((template) => {
            return (
              <Button
                color={"secondary"}
                variant={
                  selectedTemplate.id === template.id ? "contained" : "text"
                }
                sx={{
                  padding: 2,
                  display: "inline-flex",
                  flexDirection: "column",
                  gap: 2,
                }}
                key={template.id}
                onClick={() => changeTemplate(template)}
              >
                <img
                  style={{ width: 120, height: "auto" }}
                  src={template.previewUrl}
                />
                <span>{template.id}</span>
              </Button>
            );
          })}
        </div>
        <textarea
          style={{ height: 500, width: 500 }}
          value={data}
          onChange={(e) => {
            let parameterInput = e.target.value;
            setData(parameterInput);
          }}
        />
        <p>{error}</p>
        <DynamicCanvas
          json={json}
          height={selectedTemplate.height}
          width={selectedTemplate.width}
        />
      </Stack>
    </>
  );
}
