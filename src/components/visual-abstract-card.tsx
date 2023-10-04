import { Box, Card } from "@mui/material";
import { motion } from "framer-motion";
import { forwardRef } from "react";
import { StateCardContainer } from "@/components/state-card";

export const VisualAbstractCard = forwardRef<
  HTMLDivElement,
  { imageSrc: string }
>((props, ref) => {
  return (
    <Card
      ref={ref}
      elevation={0}
      component={motion.div}
      layoutId={"visual-abstract"}
      initial={{ rotate: 0, height: 350, width: "100%" }}
      animate={{ rotate: 0, height: "auto", width: "100%" }}
      sx={{
        overflow: "hidden",
        position: "relative",
        zIndex: 2,
        minHeight: 50,
        paddingBottom: {
          lg: "0",
          xs: 5,
        },
      }}
    >
      <Box
        height={408}
        width={720}
        component={motion.img}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.3 } }}
        sx={{ width: "100%", height: "auto" }}
        src={props.imageSrc}
        alt={"visual abstract"}
      />
    </Card>
  );
});
VisualAbstractCard.displayName = "VisualAbstractCard";
