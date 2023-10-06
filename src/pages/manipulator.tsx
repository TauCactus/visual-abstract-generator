import Head from "next/head";
import { FabricCanvas } from "@/components/fabric-canvas";
import { useEffect, useState } from "react";
import json from "../mtg-templates/template-1/template.json";
function getLeftandTopSkew(obj: any) {
  return { left: obj.backgroundImage.left, top: obj.backgroundImage.top };
}

function getWidthAndHeight(obj: any) {
  return {
    width: obj.backgroundImage.width,
    height: obj.backgroundImage.height,
  };
}
function modifyLeftTopKeys(
  obj: any,
  leftSkew: number,
  topSkew: number,
  depth: number,
) {
  if (depth > 2) {
    return obj;
  }
  if (typeof obj !== "object" || obj === null) {
    return obj; // Base case: If the input is not an object or is null, return it as is.
  }

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (key === "left") {
        // Check if the key is 'left' or 'top'
        obj[key] -= leftSkew; // Modify the value by subtracting 500
      } else if (key === "top") {
        obj[key] -= topSkew;
      } else {
        // Recursively call the function for nested objects or arrays
        obj[key] = modifyLeftTopKeys(obj[key], leftSkew, topSkew, depth + 1);
      }
    }
  }
  return obj;
}

function updateImageGroups(obj: any) {
  obj.objects = obj.objects.map((object: any) => {
    if (typeof object !== "object" || object === null) {
      return object; // Base case: If the input is not an object or is null, return it as is.
    }
    if (object.type !== "group") {
      return object;
    }
    const hasImageText = object.objects.find((childObject: any) => {
      return childObject.text === "IMAGE";
    });
    if (hasImageText) {
      delete object.objects;
      object.type = "image";
      object.src =
        "https://s3-us-west-2.amazonaws.com/svg-dev.mindthegraph.com/shapes/basic_square/basic_square-01.svg";
      const { width, height, scaleX, scaleY } = object;
      object.width = width * scaleX;
      object.height = height * scaleY;
      object.scaleX = 1;
      object.scaleY = 1;
      object.originX = "center";
      object.originY = "center";
      object.left = object.left + (width * scaleX) / 2;
      object.top = object.top + (height * scaleY) / 2;
    }
    return object;
  });
  return obj;
}

function updateUrls(obj: any) {
  return JSON.parse(
    JSON.stringify(obj).replaceAll(
      "https://cf-svg.mindthegraph.com",
      "https://s3-us-west-2.amazonaws.com/svg-dev.mindthegraph.com",
    ),
  );
}

function getTemplateCandidates(obj: any) {
  return obj.objects.map((object: any) => {
    if (typeof object !== "object" || object === null) {
      return null; // Base case: If the input is not an object or is null, return it as is.
    }
    if (object.type === "image") {
      return object.src;
    }
    if (object.type === "textbox") {
      return object.text;
    }
    return null;
  });
}

function applyCandidates(obj: any, substitutes: (string | null)[]) {
  if (!obj) {
    return obj;
  }
  let newObj = JSON.parse(JSON.stringify(obj));
  newObj.objects = obj.objects.map((object: any, index: number) => {
    if (typeof object !== "object" || object === null) {
      return object; // Base case: If the input is not an object or is null, return it as is.
    }

    if (substitutes.length < index) {
      return object;
    }
    if (object.type === "image") {
      object.src = substitutes[index] ?? object.src;
    }
    if (object.type === "textbox") {
      object.text = substitutes[index] ?? object.text;
    }
    return object;
  });
  return newObj;
}

export default function Home() {
  const [template, setTemplate] = useState(JSON.stringify(json));
  const [adjustedTemplate, setAdjustedTemplate] = useState<unknown>(null);
  const [appliedTemplateValues, setAppliedTemplateValues] =
    useState<unknown>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [templateCandidates, setTemplateCandidates] = useState<
    (string | null)[]
  >([]);
  const [templateCandidateOverrides, setTemplateCandidateOverrides] = useState<
    (string | null)[]
  >([]);
  useEffect(() => {
    try {
      const jsonTemplate = JSON.parse(template);
      const { width, height } = getWidthAndHeight(jsonTemplate);
      setWidth(width);
      setHeight(height);
      const { top, left } = getLeftandTopSkew(jsonTemplate);
      const fixedKeys = modifyLeftTopKeys(jsonTemplate, left, top, 0);
      const updatedUrls = updateUrls(fixedKeys);
      const fixTemplateImages = updateImageGroups(updatedUrls);
      setTemplateCandidates(getTemplateCandidates(fixTemplateImages));
      setAdjustedTemplate(fixTemplateImages);
    } catch (err) {
      console.error(err);
    }
  }, [template]);

  useEffect(() => {
    const withAppliedValues = applyCandidates(
      adjustedTemplate,
      templateCandidateOverrides,
    );
    setAppliedTemplateValues(withAppliedValues);
  }, [adjustedTemplate, templateCandidateOverrides]);
  return (
    <>
      <Head>
        <title>Visual Abstract Generator</title>
      </Head>
      <textarea
        style={{ height: 300, width: 200 }}
        value={template}
        onChange={(e) => setTemplate(e.target.value)}
      />
      <textarea
        style={{ height: 300, width: 200 }}
        value={JSON.stringify(adjustedTemplate)}
        onChange={(e) => setTemplate(e.target.value)}
      />
      <textarea
        style={{ height: 300, width: 200 }}
        value={JSON.stringify(appliedTemplateValues)}
        onChange={(e) => setTemplate(e.target.value)}
      />
      {templateCandidates.map((item, index) => {
        return (
          <input
            style={{ display: "block", width: "500px", padding: "5px" }}
            key={index}
            value={templateCandidateOverrides[index] ?? item ?? ""}
            onChange={(e) => {
              const newTemplate = [...templateCandidateOverrides];
              newTemplate[index] = e.target.value;
              setTemplateCandidateOverrides(newTemplate);
            }}
          />
        );
      })}
      {appliedTemplateValues && (
        <FabricCanvas
          json={appliedTemplateValues}
          height={height}
          width={width}
        />
      )}
    </>
  );
}
