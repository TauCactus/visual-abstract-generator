import { Box, Card } from "@mui/material";
import { motion } from "framer-motion";
import { forwardRef } from "react";

export const GeneratedVisualAbstractCard = forwardRef<
  HTMLDivElement,
  { svg: string }
>((props, ref) => {
  return (
    <Card
      ref={ref}
      elevation={0}
      component={motion.div}
      layoutId={"visual-abstract"}
      initial={{ rotate: 0, height: 292, width: "100%" }}
      animate={{ rotate: 0, height: "auto", width: "100%" }}
      sx={{
        overflow: "hidden",
        position: "relative",
        zIndex: 2,
        minHeight: 50,
        marginBottom: {
          lg: 1,
          xs: 5,
        },
      }}
    >
      <Box
        height={200}
        width={500}
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.3 } }}
        sx={{
          width: "100%",
          height: "auto",
          borderRadius: "12px",
          marginBottom: -1,
          svg: { width: "100%", height: "auto" },
        }}
        dangerouslySetInnerHTML={{ __html: props.svg }}
      />
    </Card>
  );
});

GeneratedVisualAbstractCard.displayName = "GeneratedVisualAbstractCard";
