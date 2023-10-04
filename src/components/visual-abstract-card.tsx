import { Box, Button, Card, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { forwardRef } from "react";
import Image from "next/image";

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
          lg: 1,
          xs: 5,
        },
        padding: 1,
      }}
    >
      <Stack
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={2}
      >
        <Box
          height={408}
          width={720}
          component={motion.img}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.3 } }}
          sx={{ width: "100%", height: "auto", borderRadius: "12px" }}
          src={props.imageSrc}
          alt={"visual abstract"}
        />
        <Button
          variant={"outlined"}
          startIcon={
            <Image
              style={{ height: 32, width: "auto" }}
              width={97}
              height={32}
              src={"/mind-the-graph-logo.png"}
              alt={"Mind the graph logo"}
            />
          }
        >
          Continue in Mind the Graph
        </Button>
      </Stack>
    </Card>
  );
});
VisualAbstractCard.displayName = "VisualAbstractCard";
