import { fabric } from "fabric";
import { useEffect, useState } from "react";
const FabricCanvas = (props: {
  json: unknown;
  height: number;
  width: number;
}) => {
  const [isSSR, setIsSSR] = useState(true);
  useEffect(() => {
    if (isSSR) {
      setIsSSR(false);
      return;
    }
    const element: any = document.querySelector("#fabric-canvas");
    const instance = new fabric.Canvas(element, {
      width: props.width,
      height: props.height,
      isDrawingMode: false,
      renderOnAddRemove: true,
      backgroundColor: "transparent",
      preserveObjectStacking: true,
    });
    instance.loadFromJSON(props.json, () => {});
  }, [props.json, isSSR]);
  if (isSSR) {
    return <div></div>;
  }
  return <canvas id="fabric-canvas"></canvas>;
};
export default FabricCanvas;
