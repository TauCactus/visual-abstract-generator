import { Box, Card } from "@mui/material";
import { motion } from "framer-motion";
import { forwardRef, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { AnyTemplate } from "@/mtg-templates/template-parser";
import { Template } from "@/mtg-templates/template";
import { templateOne } from "@/mtg-templates/template-1/template-one-form";
import { templateThree } from "@/mtg-templates/template-3/template-three-form";
import { templateFour } from "@/mtg-templates/template-4/template-four-form";
import { templateSeven } from "@/mtg-templates/template-7/template-seven-form";

const DynamicCanvas = dynamic(() => import("../components/fabric-canvas"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
export const GeneratedVisualAbstractCard = forwardRef<
  HTMLDivElement,
  { template: AnyTemplate }
>((props, ref) => {
  const [json, setJson] = useState<unknown>({});
  useEffect(() => {
    generateTemplateJson(props.template, setJson);
  }, [props.template]);
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
      <Box
        height={200}
        width={500}
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.3 } }}
        sx={{ width: "100%", height: "auto", borderRadius: "12px" }}
      />
      <DynamicCanvas width={500} height={200} json={json} />
    </Card>
  );
});

async function generateTemplateJson(
  anyTemplate: AnyTemplate,
  callback: (json: unknown) => void,
) {
  const template = anyTemplateToTemplate(anyTemplate);
  const prepped = await template.prepareInput(JSON.stringify(anyTemplate));
  const json = template.buildJson(prepped);

  if (json.success) {
    return callback(json.json);
  } else {
    throw new Error(json.error);
  }
}

function anyTemplateToTemplate(anyTemplate: AnyTemplate): Template<any> {
  switch (anyTemplate.inforgraphics) {
    case "Template-1":
      return templateOne;
    case "Template-3":
      return templateThree;
    case "Template-4":
      return templateFour;
    case "Template-7":
      return templateSeven;
  }
}

GeneratedVisualAbstractCard.displayName = "GeneratedVisualAbstractCard";
