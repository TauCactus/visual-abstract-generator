import { z } from "zod";
import { Template } from "@/mtg-templates/template";
import jsonTemplate from "./template-seven.json";

export const TemplateSevenForm = z.object({
  bubbleText: z.string().max(25, "caption is max 25 chars"),
  textOne: z.string().max(124, "textOne is max 124 chars"),
  textTwo: z.string().max(124, "textTwo is max 124 chars"),
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
});
