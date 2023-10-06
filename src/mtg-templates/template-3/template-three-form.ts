import { z } from "zod";
import { Template } from "@/mtg-templates/template";
import jsonTemplate from "./template-three.json";

const TemplateThreeForm = z.object({
  title: z.string().max(59, "Title is max 59 chars"),
  textOne: z.string().max(104, "TextOne is max 104 chars"),
  titleTextOne: z.string().max(15, "titleTextOne is max 15 chars"),
  textTwo: z.string().max(104, "textTwo is max 104 chars"),
  titleTextTwo: z.string().max(15, "titleTextTwo is max 15 chars"),
  textThree: z.string().max(104, "textThree is max 104 chars"),
  titleTextThree: z.string().max(15, "titleTextThree is max 15 chars"),
  imageOne: z.string(),
  imageTwo: z.string(),
  imageThree: z.string(),
});

export const templateThree = new Template({
  previewUrl: "/template-preview/template-3.png",
  id: "template-3",
  inputParser: TemplateThreeForm,
  jsonTemplate: jsonTemplate,
  width: 500,
  height: 200,
});
