import {Box, Card} from "@mui/material";
import {motion} from "framer-motion";

export const VisualAbstractCard = (props: { imageSrc: string }) => {
  return (<Card
          elevation={3}
          component={motion.div}
          layoutId={"visual-abstract"}
          animate={{ rotate: 0, width: '100%'}}
          sx={{
              position: "relative",
              width: '100%',
              zIndex: 2,
              height: 'auto'
          }}
      >
          <Box height={408} width={720} component={"img"} sx={{width: '100%'}} src={props.imageSrc} alt={"visual abstract"} />
      </Card>

  );
};
