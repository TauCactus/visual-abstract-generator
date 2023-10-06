import { z } from "zod";
export const TemplateOneForm = z.object({
  title: z.string().max(64, "Title is max 64 chars"),
  textOne: z.string().max(97, "TextOne is max 97 chars"),
  textTwo: z.string().max(97, "TextOne is max 97 chars"),
  textThree: z.string().max(97, "TextOne is max 97 chars"),
  imageOne: z.string(),
  imageTwo: z.string(),
  imageThree: z.string(),
});

export const templateOneFormat = {
  height: 200,
  width: 500,
};
