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
    title: 73,
    subtitle: 29,
    caption: 31,
    textOne: 147,
    textTwo: 147,
    textThree: 147,
    textFour: 147,
    conclusion: 182,
  },
});
