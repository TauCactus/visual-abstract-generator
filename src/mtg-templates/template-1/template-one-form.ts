import { z } from "zod";
import { Template } from "@/mtg-templates/template";
import jsonTemplate from "./template-one.json";
export const TemplateOneForm = z.object({
  title: z.string(),
  textOne: z.string(),
  textTwo: z.string(),
  textThree: z.string(),
  imageOne: z.string(),
  imageTwo: z.string(),
  imageThree: z.string(),
  conclusion: z.string().default("conclusion"),
});

export const templateOne = new Template({
  previewUrl: "/template-preview/template-1.png",
  id: "template-1",
  inputParser: TemplateOneForm,
  jsonTemplate: jsonTemplate,
  width: 500,
  height: 240,
  trim: {
    title: 62,
    textOne: 96,
    textTwo: 96,
    textThree: 96,
    conclusion: 182,
  },
});
