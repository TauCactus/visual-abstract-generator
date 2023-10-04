import { Box, Button, LinearProgress } from "@mui/material";
import {
  CardHeader,
  StateCard,
  StateCardBehind,
  StateCardContainer,
} from "@/components/state-card";
import { Lottie } from "@/lottie/lottie";
import loading from "@/lottie/lotties/loading.json";
import { AnimatePresence, motion } from "framer-motion";

export const GeneratingCard = (props: {
  done: boolean;
  regenerate: () => void;
}) => {
  return (
    <StateCardContainer>
      <StateCard
        elevation={props.done ? 0 : 5}
        layoutId={"generating"}
        zIndex={3}
      >
        <CardHeader
          completed={props.done}
          captionIdle={"Generating Visual Abstract"}
          captionCompleted={"Generation complete"}
        />
        <Lottie
          height={200}
          width={200}
          animationData={loading}
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
          {props.done && (
            <Button
              key={"done"}
              initial={{ opacity: 0, translateY: 15 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: 15 }}
              component={motion.button}
              variant={"text"}
              onClick={props.regenerate}
            >
              Generate another one
            </Button>
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
};
