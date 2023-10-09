import { z } from "zod";
import { Template } from "@/mtg-templates/template";
import jsonTemplate from "./template-seven.json";

export const TemplateSevenForm = z.object({
  bubbleText: z.string(),
  textOne: z.string(),
  textTwo: z.string(),
  largeImage: z.string(),
  imageTextOne: z.string(),
  imageTextTwo: z.string(),
});

export const templateSeven = new Template({
  previewUrl: "/template-preview/template-7.png",
  id: "template-7",
  inputParser: TemplateSevenForm,
  jsonTemplate: jsonTemplate,
  width: 500,
  height: 200,
  trim: {
    bubbleText: 25,
    textOne: 124,
    textTwo: 124,
  },
});
