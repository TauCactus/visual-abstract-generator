import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";
import WebFont from "webfontloader";
const FabricCanvas = (props: {
  dontScaleImage?: boolean;
  json: unknown;
  height: number;
  width: number;
}) => {
  const [isSSR, setIsSSR] = useState(true);
  const instanceRef = useRef<fabric.Canvas>(null);
  useEffect(() => {
    if (isSSR) {
      setIsSSR(false);
      return;
    }
    WebFont.load({
      google: {
        families: ["Francois+One", "Roboto", "Nunito"],
      },
      active: () => {
        const element: any = document.querySelector("#fabric-canvas");
        const instance = new fabric.Canvas(element, {
          width: props.width,
          height: props.height,
          isDrawingMode: false,
          interactive: false,
          renderOnAddRemove: true,
          backgroundColor: "transparent",
          preserveObjectStacking: true,
        });
        (instanceRef.current as any) = instance;
        instance.loadFromJSON(props.json, () => {
          if (!(props.dontScaleImage ?? false)) {
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
          }
        });
      },
    });
  }, [props.json, isSSR]);
  if (isSSR) {
    return <div></div>;
  }
  return (
    <canvas
      style={{ pointerEvents: "none", touchAction: "none" }}
      id="fabric-canvas"
    ></canvas>
  );
};
export default FabricCanvas;
