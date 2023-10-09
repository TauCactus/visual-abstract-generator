import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";
import WebFont from "webfontloader";
import { AnyTemplate } from "@/mtg-templates/template-parser";
import { Template } from "@/mtg-templates/template";
import { templateOne } from "@/mtg-templates/template-1/template-one-form";
import { templateThree } from "@/mtg-templates/template-3/template-three-form";
import { templateFour } from "@/mtg-templates/template-4/template-four-form";
import { templateSeven } from "@/mtg-templates/template-7/template-seven-form";
import { Box } from "@mui/material";

const SvgGenerator = (props: {
  template?: AnyTemplate;
  svgCallback: (svg: string) => void;
}) => {
  const [json, setJson] = useState<unknown>();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (!props.template) {
      return;
    }
    const template = anyTemplateToTemplate(props.template);
    template
      .prepareInput(JSON.stringify(props.template))
      .then((preparedInput) => {
        const newJson = template.buildJson(preparedInput);
        console.log(newJson);
        if (newJson.success) {
          setWidth(template.width);
          setHeight(template.height);
          setJson(newJson.json);
        } else {
          console.error(newJson.error);
        }
      });
  }, [props.template]);

  const instanceRef = useRef<fabric.Canvas>(null);
  useEffect(() => {
    if (!json) {
      return;
    }
    WebFont.load({
      google: {
        families: ["Francois+One", "Roboto", "Nunito"],
      },
      active: () => {
        const element: any = document.querySelector("#fabric-canvas");
        const instance = new fabric.Canvas(element, {
          width: width,
          height: height,
          isDrawingMode: false,
          interactive: false,
          renderOnAddRemove: true,
          backgroundColor: "transparent",
          preserveObjectStacking: true,
        });
        (instanceRef.current as any) = instance;
        instance.loadFromJSON(json, () => {
          instance.forEachObject(function (obj) {
            if (obj instanceof fabric.Image) {
              if (obj.name?.toLowerCase().includes("image")) {
                obj.dispose();
                fabric.Image.fromURL(obj.getSrc(), (img) => {
                  const scaleX = (obj.width ?? 1) / (img.width ?? 1);
                  const scaleY = (obj.height ?? 1) / (img.height ?? 1);
                  const scale = Math.min(scaleX, scaleY);
                  img.scale(scale);
                  img.left = obj.left;
                  img.top = obj.top;
                  img.originY = "center";
                  img.originX = "center";
                  instance.add(img);
                });
              }
            }
          });
          instance.renderAll();
          setTimeout(() => {
            props.svgCallback(instance.toSVG());
          }, 1000);
        });
      },
    });
  }, [json]);
  return (
    <Box
      sx={{
        position: "fixed",
        display: "none",
        width: 1,
        height: 1,
        top: 1,
        left: 1,
      }}
    >
      <canvas
        style={{
          pointerEvents: "none",
          touchAction: "none",
        }}
        id="fabric-canvas"
      ></canvas>
    </Box>
  );
};

function anyTemplateToTemplate(anyTemplate: AnyTemplate): Template<any> {
  switch (anyTemplate.inforgraphics) {
    case "Template-1":
      return templateOne;
    case "Template-2":
      return templateThree;
    case "Template-3":
      return templateFour;
    case "Template-4":
      return templateSeven;
  }
}
export default SvgGenerator;
