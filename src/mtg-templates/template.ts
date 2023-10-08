import { ZodTypeAny } from "zod";
import parse from "json-templates";
import { ErrorMessageOptions, generateErrorMessage } from "zod-error";
import { generateMock } from "@anatine/zod-mock";
type SuccessRender = {
  success: true;
  json: unknown;
};
type ErrorRender = {
  success: false;
  error: string;
};
const options: ErrorMessageOptions = {
  delimiter: {
    error: " 🔥 ",
  },
  transform: ({ errorMessage, index }) =>
    `Error #${index + 1}: ${errorMessage}`,
};

export class Template<T extends ZodTypeAny> {
  private _id: string;
  private _inputParser: T;
  private readonly _jsonTemplate: ReturnType<typeof parse>;
  private readonly _width: number;
  private readonly _height: number;
  private readonly _sampleInput: string;
  private readonly _previewUrl: string;
  constructor({
    id,
    jsonTemplate,
    inputParser,
    width,
    height,
    previewUrl,
  }: {
    id: string;
    jsonTemplate: unknown;
    inputParser: T;
    width: number;
    height: number;
    previewUrl: string;
  }) {
    this._id = id;
    (this._previewUrl = previewUrl), (this._inputParser = inputParser);
    this._jsonTemplate = parse(JSON.stringify(jsonTemplate));
    this._sampleInput = JSON.stringify(mocker(inputParser));
    this._width = width;
    this._height = height;
  }

  get id(): string {
    return this._id;
  }

  async prepareInput(input: string) {
    try {
      let parsedInput = JSON.parse(input);
      let updatedImages = await updateImages(parsedInput);
      console.log(updatedImages);
      return JSON.stringify(updatedImages);
    } catch (err) {
      console.warn(err);
      return input;
    }
  }

  buildJson(input: string): SuccessRender | ErrorRender {
    let inputParsed = null;
    try {
      inputParsed = JSON.parse(input);
    } catch (error) {
      return {
        success: false,
        error: "Invalid JSON",
      };
    }
    const result = this._inputParser.safeParse(inputParsed);
    if (result.success) {
      return {
        success: true,
        json: this._jsonTemplate(result.data),
      };
    } else {
      return {
        success: false,
        error: generateErrorMessage(result.error.issues, options),
      };
    }
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  get sampleInput(): string {
    return this._sampleInput;
  }

  get previewUrl(): string {
    return this._previewUrl;
  }
}

function mocker<T extends ZodTypeAny>(template: T) {
  return generateMock(template, {
    mockeryMapper: (keyName, fakerInstance) => {
      if (keyName.toLowerCase().includes("image")) {
        return () =>
          "https://s3-us-west-2.amazonaws.com/svg-dev.mindthegraph.com/shapes/basic_square/basic_square-02.svg";
      } else {
        return () => camelCaseToSpace(keyName);
      }
    },
  });
}

function camelCaseToSpace(text: string) {
  const result = text.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();
}

async function updateImages(input: unknown) {
  if (!input) {
    return input;
  }
  if (typeof input !== "object") {
    return input;
  }
  const inputCloned = JSON.parse(JSON.stringify(input));
  const promises = Object.keys(input).map(async (key) => {
    if (key.toLowerCase().includes("image")) {
      const url = (inputCloned as any)[key];
      if (typeof url === "string") {
        if (!url.includes("http")) {
          const query = url.split(", ").join("+");
          const fetchResult = await fetch(
            `https://search-staging.mindthegraph.com/api/images/search?q=${query}`,
          );
          const json = await fetchResult.json();
          const image = json.images[0];
          (inputCloned as any)[
            key
          ] = `https://s3-us-west-2.amazonaws.com/svg.mindthegraph.com/realistic/${image.file_name}/${image.file_name}-04.svg`;
        }
      }
    }
  });
  await Promise.all(promises);
  return inputCloned;
}
