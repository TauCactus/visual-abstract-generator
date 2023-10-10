import { z } from "zod";
import { Template } from "@/mtg-templates/template";
import jsonTemplate from "./template-three.json";

export const TemplateThreeForm = z.object({
  title: z.string(),
  textOne: z.string(),
  titleTextOne: z.string(),
  textTwo: z.string(),
  titleTextTwo: z.string(),
  textThree: z.string(),
  titleTextThree: z.string(),
  imageOne: z.string(),
  imageTwo: z.string(),
  imageThree: z.string(),
  conclusion: z.string().default("conclusion"),
});

export const templateThree = new Template({
  previewUrl: "/template-preview/template-3.png",
  id: "template-3",
  inputParser: TemplateThreeForm,
  jsonTemplate: jsonTemplate,
  width: 500,
  height: 240,
  trim: {
    title: 51,
    textOne: 93,
    titleTextOne: 14,
    textTwo: 93,
    titleTextTwo: 14,
    textThree: 93,
    titleTextThree: 14,
    conclusion: 182,
  },
});
