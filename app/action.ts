"use server";

import { z } from "zod";
import { auth, signIn } from "@/auth";
import { revalidatePath } from "next/cache";
import { prisma } from "@/prisma/prisma";
import { join } from "path";
import { writeFile } from "fs/promises";
import { permanentRedirect, redirect, RedirectType } from "next/navigation";
import { ADMIN } from "./lib/data";

const schema = z.object({
  size: z.string().min(1),
  color: z.string().min(1),
  stickColor: z.string(),
  location: z.string(),
  customerNumber: z.string().min(5),
  consent: z.coerce.boolean().refine(
    (val) => {
      return val === true;
    },
    { message: "you must consent" }
  ),
});
const ACCEPTED_FILE_TYPES = ["image/png", "image/jpg"];

const hoodieSchema = z.object({
  file: z.instanceof(File).refine((file) => {
    return ACCEPTED_FILE_TYPES.includes(file.type);
  }, "file must a picture with png or jpg"),
  size: z.string(),
  color: z.string(),
});

export async function orderHoodieAction(
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
    return { message: res.error.errors };
  }
  const { size, color, stickColor, location, consent, customerNumber } =
    res.data;

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
  const stickColorRecord = await prisma.stickColor.findFirst({
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
  const orderRecord = await prisma.order.create({
    data: {
      hoodieVariantId: hoodieVariantRecord!.id,
      userId: userRecord.id,
      locationId: locationRecord!.id,
      stickColorId: stickColorRecord!.id,
      quantity: 1,
    },
  });
}

export async function signInAction() {
  await signIn();
}

export async function uploadHoodieVariantAction(formData: FormData | null) {
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
  });

  if (!validation.success) {
    return { message: "error in operation" };
  }
  const { file, color, size } = validation.data;
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
      create: { name: size.toUpperCase() },
    });
    const colorRecord = await prisma.color.upsert({
      where: {
        name: color,
      },
      update: {},
      create: { name: color.toUpperCase(), code: "" },
    });
    if (sizeRecord === null) {
      return { message: "error size does not exit" };
    }
    if (colorRecord === null) {
      return { message: " error color does not exit" };
    }
    const checkHoodieExistence = await prisma.hoodieVariant.findFirst({
      where: {
        sizeId: sizeRecord.id,
        colorId: colorRecord.id,
      },
    });
    if (checkHoodieExistence !== null) {
      return { message: "hoodie variation already exits" };
    }
    await prisma.hoodieVariant.create({
      data: {
        sizeId: sizeRecord.id,
        colorId: colorRecord.id,
        available: true,
        imagePath: fileName,
      },
    });
    revalidatePath("/dashboard/product");
    return { message: "successfull" };
  } catch (e) {
    console.log("an error occured", e);
    return { message: "error" };
  }
}

export async function deleteUserAction(id: number) {
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  if (session.user.role === ADMIN) {
    const deletedUser = await prisma.user.delete({
      where: {
        id: id,
      },
      include: {
        orders: true,
      },
    });
    revalidatePath("/dashboard/users");
  }
}
