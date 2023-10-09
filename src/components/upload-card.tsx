import { Box, Button, Chip } from "@mui/material";
import { Lottie } from "@/lottie/lottie";
import idle from "@/lottie/lotties/idle.json";
import uploaded from "@/lottie/lotties/uploaded.json";
import {
  StateCard,
  StateCardBehind,
  StateCardContainer,
  CardHeader,
} from "@/components/state-card";
import { forwardRef, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const UploadCard = forwardRef<
  HTMLElement,
  {
    done: boolean;
    file: File | null;
    setFile: (file: null | File) => void;
  }
>(({ done, file, setFile }, ref) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const clearFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFile(null);
  };
  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <StateCardContainer ref={ref}>
      <StateCard elevation={!file ? 5 : 0} zIndex={4} layoutId={"upload"}>
        <CardHeader
          completed={file != null}
          captionCompleted={"Uploaded"}
          captionIdle={"Upload manuscript"}
        />
        {!done && (
          <Box component={motion.div}>
            <Lottie
              key={"idle"}
              height={200}
              width={200}
              animationData={idle}
            />
          </Box>
        )}
        {done && (
          <Lottie
            key={"uploaded"}
            loop={false}
            height={200}
            width={200}
            animationData={uploaded}
          />
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <AnimatePresence mode={"wait"} initial={false}>
          {done && (
            <Chip
              key={"chip"}
              component={motion.div}
              initial={{ opacity: 0, translateY: 15 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: 15 }}
              sx={{ maxWidth: 220 }}
              label={file?.name ?? "Previous uploaded file"}
              variant="outlined"
            />
          )}
          {!done && (
            <Button
              key={"button"}
              initial={{ opacity: 0, translateY: -15 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: -15 }}
              component={motion.button}
              variant={"contained"}
              onClick={openFileDialog}
            >
              Choose file
            </Button>
          )}
        </AnimatePresence>
      </StateCard>
      {!done && <StateCardBehind layoutId={"generating"} />}
    </StateCardContainer>
  );
});

UploadCard.displayName = "UploadCard";
