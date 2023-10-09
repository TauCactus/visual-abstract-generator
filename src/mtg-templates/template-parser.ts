import { TemplateOneForm } from "@/mtg-templates/template-1/template-one-form";
import { z } from "zod";
import { TemplateThreeForm } from "@/mtg-templates/template-3/template-three-form";
import { TemplateFourForm } from "@/mtg-templates/template-4/template-four-form";
import { TemplateSevenForm } from "@/mtg-templates/template-7/template-seven-form";

const TemplateOneWithIdentifier = TemplateOneForm.merge(
  z.object({ inforgraphics: z.literal("Template-1") }),
);
const TemplateThreeWithIdentifier = TemplateThreeForm.merge(
  z.object({ inforgraphics: z.literal("Template-3") }),
);
const TemplateFourWithIdentifier = TemplateFourForm.merge(
  z.object({ inforgraphics: z.literal("Template-4") }),
);
const TemplateSevenWithIdentifier = TemplateSevenForm.merge(
  z.object({ inforgraphics: z.literal("Template-7") }),
);

export const AnyTemplate = z.union([
  TemplateOneWithIdentifier,
  TemplateThreeWithIdentifier,
  TemplateFourWithIdentifier,
  TemplateSevenWithIdentifier,
]);
export type AnyTemplate = z.infer<typeof AnyTemplate>;
