"use server";

import { z } from "zod";

const schema = z.object({
  size: z.string(),
  color: z.string(),
  stickColor: z.string(),
  location: z.string(),
  consent: z.coerce.boolean(),
});

export async function createAction(prevState: any, formData: FormData | null) {
  console.log(formData);
  const form = Object.fromEntries(formData!.entries());
  const res = schema.safeParse(form);
  console.log(form);

  if (!res.success) {
    return { message: "error occured" };
  }
  return { message: "working" };
}
