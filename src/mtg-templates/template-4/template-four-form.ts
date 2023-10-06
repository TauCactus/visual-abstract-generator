import { z } from "zod";
import { Template } from "@/mtg-templates/template";
import jsonTemplate from "./template-four.json";

const TemplateFourForm = z.object({
  title: z.string().max(76, "Title is max 76 chars"),
  subtitle: z.string().max(14, "subtitle is max 14 chars"),
  caption: z.string().max(11, "caption is max 11 chars"),
  captionImage: z.string(),
  textOne: z.string().max(190, "textOne is max 190 chars"),
  textTwo: z.string().max(190, "textTwo is max 190 chars"),
  textThree: z.string().max(190, "textThree is max 190 chars"),
  textFour: z.string().max(190, "textFour is max 190 chars"),
  imageOne: z.string(),
  imageTwo: z.string(),
  imageThree: z.string(),
  imageFour: z.string(),
});

export const templateFour = new Template({
  previewUrl: "/template-preview/template-4.png",
  id: "template-4",
  inputParser: TemplateFourForm,
  jsonTemplate: jsonTemplate,
  width: 500,
  height: 200,
});
