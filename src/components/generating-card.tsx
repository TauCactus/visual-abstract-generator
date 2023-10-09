import { Box, Button, LinearProgress, Typography } from "@mui/material";
import {
  CardHeader,
  StateCard,
  StateCardBehind,
  StateCardContainer,
} from "@/components/state-card";
import { Lottie } from "@/lottie/lottie";
import reading from "@/lottie/lotties/reading.json";
import { AnimatePresence, motion } from "framer-motion";
import { forwardRef, useEffect, useState } from "react";

export const GeneratingCard = forwardRef<
  HTMLElement,
  {
    done: boolean;
    requestStart: null | Date;
  }
>((props, ref) => {
  const [elapsedTime, setElapsedTime] = useState("");
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!props.requestStart) {
        return;
      }
      setElapsedTime(calculateTimeElapsedSince(props.requestStart));
    }, 100);
    return () => {
      clearInterval(intervalId);
    };
  }, [props.requestStart]);
  return (
    <StateCardContainer ref={ref}>
      <StateCard
        elevation={props.done ? 0 : 5}
        layoutId={"generating"}
        zIndex={3}
      >
        <CardHeader
          completed={props.done}
          captionIdle={"Analyzing manuscript"}
          captionCompleted={"Analysis complete"}
        />
        {!props.done && (
          <Typography
            component={motion.p}
            key={"caption"}
            initial={{ opacity: 0, translateY: 15 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 15 }}
            variant={"caption"}
          >
            It might take up to 2 minutes
          </Typography>
        )}
        {!props.done && (
          <Typography
            component={motion.p}
            key={"elapsed"}
            initial={{ opacity: 0, translateY: 15 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 15 }}
            variant={"body2"}
          >
            Time elapsed {elapsedTime}
          </Typography>
        )}

        <Lottie
          height={200}
          width={200}
          animationData={reading}
          pause={props.done}
          loop={!props.done}
        />
        <AnimatePresence mode={"wait"}>
          {!props.done && (
            <Box
              initial={{ opacity: 0, translateY: -15 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: -15 }}
              key={"idle"}
              component={motion.div}
            />
          )}
        </AnimatePresence>
        {!props.done && (
          <LinearProgress
            sx={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
            variant={"indeterminate"}
          />
        )}
      </StateCard>
      {!props.done && <StateCardBehind layoutId={"visual-abstract"} />}
    </StateCardContainer>
  );
});
GeneratingCard.displayName = "GeneratingCard";

function calculateTimeElapsedSince(date: Date) {
  const currentDate = new Date();
  const timeDifferenceInSeconds = Math.floor(
    (currentDate.getTime() - date.getTime()) / 1000,
  ); // Convert milliseconds to seconds
  const minutes = Math.floor(timeDifferenceInSeconds / 60);
  const seconds = timeDifferenceInSeconds % 60;

  // Format the result as "mm:ss"
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}
