import { PropsWithChildren } from "react";
import { Box, Card, Stack, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { Lottie } from "@/lottie/lottie";
import checkmark from "@/lottie/lotties/checkmark.json";

export const StateCardContainer = (props: PropsWithChildren) => {
  return (
    <Box
      sx={{
        position: "relative",
        width: 350,
        minHeight: 350,
      }}
    >
      {props.children}
    </Box>
  );
};
export const StateCard = (
  props: PropsWithChildren<{ zIndex?: number; layoutId?: string }>,
) => {
  return (
    <Card
      elevation={3}
      component={motion.div}
      layoutId={props.layoutId}
      initial={{ rotate: 0, width: 350, height: 350 }}
      animate={{ rotate: 0, width: 350, height: 350 }}
      sx={{
        position: "relative",
        padding: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 1,
        flexDirection: "column",
        zIndex: props.zIndex ?? 2,
      }}
    >
      {props.children}
    </Card>
  );
};

export const StateCardBehind = (
  props: PropsWithChildren<{ layoutId?: string }>,
) => {
  return (
    <Card
      elevation={2}
      component={motion.div}
      layoutId={props.layoutId}
      initial={{
        opacity: 0,
        rotate: 0,
        top: 0,
        left: 0,
        width: 350,
          height: 350,
      }}
      animate={{
        rotate: 3,
        opacity: 1,
        top: 10,
        left: 10,
          height: 350,
        transition: { delay: 0.3 },
        width: 350,
      }}
      sx={{
        position: "absolute",
        width: 350,
        padding: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 1,
        flexDirection: "column",
        zIndex: 1,
      }}
    >
      {props.children}
    </Card>
  );
};

export const CardHeader = ({
  completed,
  captionCompleted,
  captionIdle,
}: {
  completed: boolean;
  captionCompleted: string;
  captionIdle: string;
}) => {
  return (
    <Stack
      direction={"row"}
      spacing={2}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Box sx={{ width: 20, height: 20, position: "relative" }}></Box>
      <AnimatePresence mode={"wait"} initial={false}>
        {!completed && (
          <Typography
            initial={{ opacity: 0, translateY: -15 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -15 }}
            key={"initial"}
            component={motion.h6}
            variant={"h6"}
          >
            {captionIdle}
          </Typography>
        )}
        {completed && (
          <Typography
            initial={{ opacity: 0, translateY: 15 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 15 }}
            key={"uploaded"}
            component={motion.h6}
            variant={"h6"}
          >
            {captionCompleted}
          </Typography>
        )}
      </AnimatePresence>
      <Box sx={{ width: 20, height: 20, position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            left: -40,
            top: -40,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {completed && (
            <Lottie
              loop={false}
              height={100}
              width={100}
              animationData={checkmark}
            />
          )}
        </Box>
      </Box>
    </Stack>
  );
};
