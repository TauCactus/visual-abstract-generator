import Head from "next/head";
import { FabricCanvas } from "@/components/fabric-canvas";
import { generateMock } from "@anatine/zod-mock";
import { useState } from "react";
import {
  TemplateOneForm,
  templateOneFormat,
} from "@/mtg-templates/template-1/template-one-form";
import templateoOne from "@/mtg-templates/template-1/template-one.json";
import parse from "json-templates";
import { ErrorMessageOptions, generateErrorMessage } from "zod-error";

const defaultMock = generateMock(TemplateOneForm, {
  mockeryMapper: (keyName, fakerInstance) => {
    if (keyName.includes("image")) {
      return () =>
        "https://s3-us-west-2.amazonaws.com/svg-dev.mindthegraph.com/shapes/basic_square/basic_square-02.svg";
    } else {
      return () => "Your text";
    }
  },
});
const options: ErrorMessageOptions = {
  delimiter: {
    error: " 🔥 ",
  },
  transform: ({ errorMessage, index }) =>
    `Error #${index + 1}: ${errorMessage}`,
};
export default function Home() {
  const templateOne = parse(templateoOne);
  const [data, setData] = useState(JSON.stringify(defaultMock));
  const [error, setError] = useState("");
  const [json, setJson] = useState(() => {
    const parameters = TemplateOneForm.parse(JSON.parse(data));
    return templateOne(parameters);
  });

  return (
    <>
      <Head>
        <title>Visual Abstract Generator</title>
      </Head>
      <div style={{ padding: 30 }}>
        <textarea
          style={{ height: 500, width: 500 }}
          value={data}
          onChange={(e) => {
            let parameterInput = e.target.value;
            setData(parameterInput);
            let parsedData = null;
            try {
              parsedData = JSON.parse(parameterInput);
            } catch (err) {
              setError("Invalid json");
            }
            if (parsedData) {
              const safeParsed = TemplateOneForm.safeParse(parsedData);
              if (safeParsed.success) {
                setJson(templateOne(safeParsed));
              } else {
                setError(
                  generateErrorMessage(safeParsed.error.issues, options),
                );
              }
            }
          }}
        />
        <p>{error}</p>
        <FabricCanvas
          json={json}
          height={templateOneFormat.height}
          width={templateOneFormat.width}
        />
      </div>
    </>
  );
}
