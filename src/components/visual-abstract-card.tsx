import { Box, Card } from "@mui/material";
import { motion } from "framer-motion";

export const VisualAbstractCard = (props: { imageSrc: string }) => {
  return (
    <Card
      elevation={0}
      component={motion.div}
      layoutId={"visual-abstract"}
      animate={{ rotate: 0, height: "auto", width: "100%" }}
      sx={{
        position: "relative",
        width: "100%",
        zIndex: 2,
        height: "auto",
        minHeight: 50,
        overflow: "hidden",
      }}
    >
      <Box
        height={408}
        width={720}
        component={"img"}
        sx={{ width: "100%", height: "auto" }}
        src={props.imageSrc}
        alt={"visual abstract"}
      />
    </Card>
  );
};
