"use server";

import { z } from "zod";
import { auth, signIn } from "@/auth";
import { availableParallelism } from "os";
import { revalidatePath } from "next/cache";
import { prisma } from "./../prisma/prisma";
import { join } from "path";
import { writeFile } from "fs/promises";
import { permanentRedirect, redirect, RedirectType } from "next/navigation";
import { ADMIN } from "./lib/data";
import { user } from "@nextui-org/theme";

const schema = z.object({
  size: z.string(),
  color: z.string(),
  stickColor: z.string(),
  location: z.string(),
  customerNumber: z.string().min(5),
  consent: z.coerce.boolean(),
});
const ACCEPTED_FILE_TYPES = ["image/png", "image/jpg"];

const hoodieSchema = z.object({
  file: z.instanceof(File).refine((file) => {
    return ACCEPTED_FILE_TYPES.includes(file.type);
  }, "file must a picture"),
  size: z.string(),
  color: z.string(),
  available: z.coerce.boolean(),
});

export async function orderHoodieAction(
  prevState: any,
  formData: FormData | null
) {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  console.log("this is the result", formData);
  const form = Object.fromEntries(formData!.entries());
  const res = schema.safeParse(form);
  console.log("this is the result", res.error?.errors);
  if (!res.success) {
    return { message: res.error.errors };
  }
  const { size, color, stickColor, location, consent, customerNumber } =
    res.data;
  if (consent === false) {
    return { message: "not consented" };
  }
  const locationRecord = await prisma.location.findFirst({
    where: {
      name: location,
    },
  });
  const colorRecord = await prisma.color.findFirst({
    where: {
      name: color,
    },
  });
  const sizeRecord = await prisma.size.findFirst({
    where: {
      name: size,
    },
  });
  const stickColorRecord = await prisma.location.findFirst({
    where: {
      name: stickColor,
    },
  });
  const hoodieVariantRecord = await prisma.hoodieVariant.findFirst({
    where: {
      colorId: colorRecord?.id,
      sizeId: sizeRecord?.id,
    },
  });
  const userSession = session.user!;
  const name = userSession.name?.split(" ")!;
  const userRecord = await prisma.user.upsert({
    where: {
      email: userSession.email!,
    },
    update: {},
    create: {
      firstName: name[0],
      lastName: name[1],
      email: userSession.email!,
      customerNumber: customerNumber,
    },
  });
  return { message: "success" };
}

export async function signInAction() {
  await signIn();
}

export async function uploadHoodieVariantAction(
  prevState: any,
  formData: FormData | null
) {
  const session = await auth();
  if (!session || session?.user.role !== ADMIN) {
    redirect("/");
  }
  if (formData === null) {
    return { message: "form should not be empty" };
  }
  const validation = hoodieSchema.safeParse({
    file: formData?.get("file"),
    color: formData?.get("color"),
    size: formData?.get("size"),
    available: formData?.get("available"),
  });

  if (!validation.success) {
    return { message: "error in operation" };
  }
  const { file, color, size, available } = validation.data;
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const uniqueSuffix = `${new Date(Date.now())}`;
    const fileName = uniqueSuffix + validation.data.file.name;
    const uploadDir = join(process.cwd(), "public");
    await writeFile(`${uploadDir}/${fileName}`, buffer);
    const sizeRecord = await prisma.size.upsert({
      where: {
        name: size,
      },
      update: {},
      create: { name: size },
    });
    const colorRecord = await prisma.color.upsert({
      where: {
        name: color,
      },
      update: {},
      create: { name: color },
    });
    if (sizeRecord === null) {
      return { message: "error size does not exit" };
    }
    if (colorRecord === null) {
      return { message: " error color does not exit" };
    }
    await prisma.hoodieVariant.create({
      data: {
        sizeId: sizeRecord.id,
        colorId: colorRecord.id,
        available: available,
        imagePath: fileName,
      },
    });
    return { message: "successfull" };
  } catch (e) {
    console.log("an error occured", e);
    return { message: "error" };
  }
}
