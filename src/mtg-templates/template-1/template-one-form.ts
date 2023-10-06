import { z } from "zod";
import { Template } from "@/mtg-templates/template";
import jsonTemplate from "./template-one.json";
const TemplateOneForm = z.object({
  title: z.string().max(64, "Title is max 64 chars"),
  textOne: z.string().max(97, "TextOne is max 97 chars"),
  textTwo: z.string().max(97, "textTwo is max 97 chars"),
  textThree: z.string().max(97, "textThree is max 97 chars"),
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
});
