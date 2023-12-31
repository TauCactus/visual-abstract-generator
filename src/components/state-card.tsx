import { forwardRef, PropsWithChildren } from "react";
import { Box, Card, Stack, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { Lottie } from "@/lottie/lottie";
import checkmark from "@/lottie/lotties/checkmark.json";

export const StateCardContainer = forwardRef<HTMLElement, PropsWithChildren>(
  (props, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          position: "relative",
          minHeight: 350,
          width: {
            lg: 350,
            xs: "100%",
          },
          paddingBottom: {
            lg: "0",
            xs: 5,
          },
        }}
      >
        {props.children}
      </Box>
    );
  },
);
StateCardContainer.displayName = "StateCardContainer";
export const StateCard = (
  props: PropsWithChildren<{
    elevation?: number;
    zIndex?: number;
    layoutId?: string;
  }>,
) => {
  return (
    <Card
      elevation={props.elevation ?? 2}
      component={motion.div}
      layoutId={props.layoutId}
      initial={{ rotate: 0, minWidth: 350, height: 350 }}
      animate={{ rotate: 0, minWidth: 350, height: 350 }}
      sx={{
        position: "relative",
        minHeight: 350,
        minWidth: 350,
        padding: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 1,
        flexDirection: "column",
        zIndex: props.zIndex ?? 2,
        width: {
          lg: 350,
          xs: "100%",
        },
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
        minWidth: 350,
        height: 350,
      }}
      animate={{
        rotate: 3,
        opacity: 1,
        top: 10,
        left: 10,
        height: 350,
        transition: { delay: 0.3 },
        minWidth: 350,
      }}
      sx={{
        position: "absolute",
        padding: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 1,
        flexDirection: "column",
        zIndex: 1,
        width: {
          lg: 350,
          xs: "100%",
        },
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
            sx={{ textAlign: "center" }}
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
            sx={{ textAlign: "center" }}
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
