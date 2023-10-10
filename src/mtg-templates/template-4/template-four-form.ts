import { z } from "zod";
import { Template } from "@/mtg-templates/template";
import jsonTemplate from "./template-four.json";

export const TemplateFourForm = z.object({
  title: z.string(),
  subtitle: z.string(),
  caption: z.string(),
  captionImage: z.string(),
  textOne: z.string(),
  textTwo: z.string(),
  textThree: z.string(),
  textFour: z.string(),
  imageOne: z.string(),
  imageTwo: z.string(),
  imageThree: z.string(),
  imageFour: z.string(),
  conclusion: z.string().default("conclusion"),
});

export const templateFour = new Template({
  previewUrl: "/template-preview/template-4.png",
  id: "template-4",
  inputParser: TemplateFourForm,
  jsonTemplate: jsonTemplate,
  width: 500,
  height: 240,
  trim: {
    title: 76,
    subtitle: 14,
    caption: 11,
    textOne: 190,
    textTwo: 190,
    textThree: 190,
    textFour: 190,
    conclusion: 182,
  },
});
