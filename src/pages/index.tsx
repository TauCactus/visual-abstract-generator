import Head from "next/head";
import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import { UploadCard } from "@/components/upload-card";
import { StateCard } from "@/components/state-card";
import { Lottie } from "@/lottie/lottie";
import loading from "@/lottie/lotties/loading.json";
import { useEffect, useState } from "react";
import { useUpload } from "@/api/api";
import { GeneratingCard } from "@/components/generating-card";
import {VisualAbstractCard} from "@/components/visual-abstract-card";

export default function Home() {
  const [file, setFile] = useState<null | File>(null);
  const { mutate, data } = useUpload();
  const setFileAndUpload = (file: null | File) => {
    setFile(file);
    mutate();
  };
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <>
      <Head>
        <title>Visual Abstract Generator</title>
        <meta
          name="Visual abstract"
          content="Generate your visual abstract automatically"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Stack component={"main"} sx={{ margin: "5% auto", maxWidth: 730 }} direction={'column'} gap={6}>
        <Stack direction={"row"} spacing={2} justifyContent={file ? "space-between" : "space-evenly"}>
          <UploadCard file={file} setFile={setFileAndUpload} />
          {file && <GeneratingCard done={data !== undefined} />}
        </Stack>
        <Stack direction={"row"} spacing={2} justifyContent={"space-evenly"}>
          {data && file && <VisualAbstractCard imageSrc={data.imageUrl} /> }
        </Stack>
      </Stack>
    </>
  );
}
