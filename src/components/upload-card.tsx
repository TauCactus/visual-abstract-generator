import {
  Box,
  Button,
  Chip,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";
import { Lottie } from "@/lottie/lottie";
import idle from "@/lottie/lotties/idle.json";
import uploaded from "@/lottie/lotties/uploaded.json";
import {
  StateCard,
  StateCardBehind,
  StateCardContainer,
  CardHeader,
} from "@/components/state-card";
import { forwardRef, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const UploadCard = forwardRef<
  HTMLElement,
  {
    done: boolean;
    file: File | null;
    setFile: (file: null | File, gptKey: string) => void;
  }
>(({ done, file, setFile }, ref) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [gptKey, setGptKey] = useState("");
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file, gptKey);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
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
              height={150}
              width={150}
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
            <Stack
              direction={"column"}
              spacing={1}
              component={motion.div}
              key={"input"}
              initial={{ opacity: 0, translateY: -15 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: -15 }}
            >
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  GPT key
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  onChange={(event) => setGptKey(event.target.value)}
                  value={gptKey}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <Button variant={"contained"} onClick={openFileDialog}>
                Choose file
              </Button>
            </Stack>
          )}
        </AnimatePresence>
      </StateCard>
      {!done && <StateCardBehind layoutId={"generating"} />}
    </StateCardContainer>
  );
});

UploadCard.displayName = "UploadCard";
