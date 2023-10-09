import Head from "next/head";
import { Alert, Box, Snackbar, Stack } from "@mui/material";
import { UploadCard } from "@/components/upload-card";
import { useEffect, useRef, useState } from "react";
import { usePolling, useUpload } from "@/api/api";
import { GeneratingCard } from "@/components/generating-card";
import Image from "next/image";
import { Lottie } from "@/lottie/lottie";
import heart from "@/lottie/lotties/heart.json";
import { useRouter } from "next/router";
import { GeneratedVisualAbstractCard } from "@/components/generated-abstract-card";

export default function Home() {
  const [file, setFile] = useState<null | File>(null);
  const { mutateAsync, error, data, reset } = useUpload();
  const [requestStart, setRequestStart] = useState<null | Date>(null);
  const [startAnimation, setStartAnimation] = useState(false);
  const state = file ? (data ? "result" : "generating") : "idle";
  const router = useRouter();
  const { query } = useRouter();
  const { data: resultData, error: pollingError } = usePolling(
    typeof query.id === "string" ? query.id : undefined,
  );
  const allErrors = error ?? pollingError;
  const setFileAndUpload = async (file: null | File) => {
    if (file) {
      setFile(file);
      setRequestStart(new Date());
      const response = await mutateAsync(file);
      router.query.id = response.request_id;
      await router.push(router);
    }
  };
  const idleElement = useRef<HTMLElement>(null);
  const resultElement = useRef<HTMLDivElement>(null);
  const generatingElement = useRef<HTMLElement>(null);
  const stepOneComplete = file || query.id !== undefined;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      switch (state) {
        case "generating":
          generatingElement.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          break;
        case "idle":
          idleElement.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          break;
        case "result":
          resultElement.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          break;
      }
    }, 700);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [state]);

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
              lg: stepOneComplete ? "space-between" : "space-evenly",
              xs: "flex-start",
            }}
            spacing={2}
          >
            <UploadCard
              ref={idleElement}
              file={file}
              setFile={setFileAndUpload}
            />
            {stepOneComplete && (
              <GeneratingCard
                ref={generatingElement}
                requestStart={requestStart}
                done={resultData?.status === "ready"}
              />
            )}
          </Stack>
          {resultData && resultData.status === "ready" && (
            <GeneratedVisualAbstractCard
              ref={resultElement}
              template={resultData.template}
            />
          )}
        </Stack>
        <Snackbar
          anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
          open={Boolean(error)}
        >
          <Alert severity="error" sx={{ width: "100%" }}>
            {typeof allErrors === "string"
              ? allErrors
              : "An error has occurred"}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
}
