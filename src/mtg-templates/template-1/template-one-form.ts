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
});

export const templateOne = new Template({
  previewUrl: "/template-preview/template-1.png",
  id: "template-1",
  inputParser: TemplateOneForm,
  jsonTemplate: jsonTemplate,
  width: 500,
  height: 200,
  trim: {
    title: 65,
    textOne: 97,
    textTwo: 97,
    textThree: 97,
  },
});
