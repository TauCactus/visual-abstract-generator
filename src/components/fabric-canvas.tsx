import { fabric } from "fabric";
import { useEffect } from "react";
export const FabricCanvas = (props: {
  json: unknown;
  height: number;
  width: number;
}) => {
  useEffect(() => {
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
  }, [props.json]);
  return <canvas id="fabric-canvas"></canvas>;
};
