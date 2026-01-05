import z from "zod";

export const userValidationSchema = z.object({
  chiefComplaint: z.string(),
  healthConcerns: z
    .string()
    .max(4000, { message: "too long, max: 4000 characters" }),
  medications: z.boolean(),
  subjective: z.string(),
  objective: z.string(),
  assessment: z.string(),
  plan: z.string(),
  sharedViaPHR: z.string(),
});
