"use server";

import { z } from "zod";
import { auth, signIn } from "@/auth";
import { availableParallelism } from "os";
import { revalidatePath } from "next/cache";
import { prisma } from "./../prisma/prisma";
import { join } from "path";
import { writeFile } from "fs/promises";
import { permanentRedirect, redirect, RedirectType } from "next/navigation";

const schema = z.object({
  size: z.string(),
  color: z.string(),
  stickColor: z.string(),
  location: z.string(),
  consent: z.coerce.boolean(),
});
const ACCEPTED_FILE_TYPES = ["image/png", "image/jpg"];

const hoodieSchema = z.object({
  file: z.instanceof(File).refine((file) => {
    return ACCEPTED_FILE_TYPES.includes(file.type);
  }, "file must a picture"),
  size: z.string(),
  color: z.string(),
  quantity: z.coerce.number(),
  available: z.coerce.boolean(),
});

export async function createHoodieAction(
  prevState: any,
  formData: FormData | null
) {
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  const form = Object.fromEntries(formData!.entries());
  const res = schema.safeParse(form);

  if (!res.success) {
    return { message: "error occured" };
  }

  return { message: "working" };
}

export async function signInAction() {
  await signIn();
}

export async function uploadAction(prevState: any, formData: FormData | null) {
  if (formData === null) {
    return { message: "form should not be empty" };
  }
  const validation = hoodieSchema.safeParse({
    file: formData?.get("file"),
    color: formData?.get("color"),
    size: formData?.get("size"),
    quantity: formData?.get("quantity"),
    available: formData?.get("available"),
  });

  if (validation.success) {
    try {
      const buffer = Buffer.from(await validation.data.file.arrayBuffer());
      const uniqueSuffix = `${new Date(Date.now())}`;
      console.log(uniqueSuffix);
      const fileName = uniqueSuffix + validation.data.file.name;
      const uploadDir = join(process.cwd(), "public");
      await writeFile(`${uploadDir}/${fileName}`, buffer);
      // await prisma.hoodieVariant.create({
      //   data: {
      //     size: await prisma.size.findFirst(validation.data.size),
      //      color: validation.data.color,
      //     quantity: validation.data.quantity,
      //     available: validation.data.available,
      //     imagePath: fileName,
      //   },
      // });
      return { message: "ok" };
    } catch (e) {
      console.log("an error occured", e);
      return { message: "error" };
    }
  }
}
