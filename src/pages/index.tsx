import Head from "next/head";
import { Box, Stack } from "@mui/material";
import { UploadCard } from "@/components/upload-card";
import { useState } from "react";
import { useUpload } from "@/api/api";
import { GeneratingCard } from "@/components/generating-card";
import { VisualAbstractCard } from "@/components/visual-abstract-card";
import Image from "next/image";
import { Lottie } from "@/lottie/lottie";
import heart from "@/lottie/lotties/heart.json";

export default function Home() {
  const [file, setFile] = useState<null | File>(null);
  const { mutate, data, reset } = useUpload();
  const [startAnimation, setStartAnimation] = useState(false);
  const setFileAndUpload = (file: null | File) => {
    setFile(file);
    mutate();
  };
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
        <meta name="theme-color" content="#f5f5f5" />
      </Head>
      <Box sx={{ marginLeft: 2, marginRight: 2 }}>
        <Stack
          sx={{ maxWidth: 300, margin: "0 auto", marginBottom: 4 }}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          onMouseLeave={() => setStartAnimation(false)}
          onMouseEnter={() => setStartAnimation(true)}
        >
          <Image
            style={{ height: 32, width: "auto" }}
            width={97}
            height={32}
            src={"/mind-the-graph-logo.png"}
            alt={"Mind the graph logo"}
          />
          <Lottie
            height={50}
            width={50}
            animationData={heart}
            loop={startAnimation}
          />
          <Image
            style={{ height: 32, width: "auto" }}
            width={177}
            height={45}
            src={"/paperpal-logo.svg"}
            alt={"Paperpal logo"}
          />
        </Stack>
        <Stack
          component={"main"}
          sx={{ margin: "0 auto", maxWidth: 730 }}
          direction={"column"}
          gap={{ lg: 3, xs: 2 }}
        >
          <Stack
            direction={{ lg: "row", xs: "column" }}
            justifyContent={{
              lg: file ? "space-between" : "space-evenly",
              xs: "flex-start",
            }}
            spacing={2}
          >
            <UploadCard file={file} setFile={setFileAndUpload} />
            {file && (
              <GeneratingCard
                regenerate={() => {
                  reset();
                  mutate();
                }}
                done={data !== undefined}
              />
            )}
          </Stack>
          {data && file && <VisualAbstractCard imageSrc={data.imageUrl} />}
        </Stack>
      </Box>
    </>
  );
}
