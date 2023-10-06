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
  constructor({
    id,
    jsonTemplate,
    inputParser,
    width,
    height,
  }: {
    id: string;
    jsonTemplate: unknown;
    inputParser: T;
    width: number;
    height: number;
  }) {
    this._id = id;
    this._inputParser = inputParser;
    this._jsonTemplate = parse(JSON.stringify(jsonTemplate));
    this._sampleInput = JSON.stringify(mocker(inputParser));
    this._width = width;
    this._height = height;
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
}

function mocker<T extends ZodTypeAny>(template: T) {
  return generateMock(template, {
    mockeryMapper: (keyName, fakerInstance) => {
      if (keyName.includes("image")) {
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
