"use server";

import { z } from "zod";
import { auth, signIn } from "@/auth";
import { revalidatePath } from "next/cache";
import { prisma } from "@/prisma/prisma";
import { join } from "path";
import { writeFile } from "fs/promises";
import { redirect } from "next/navigation";
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
  file: z
    .instanceof(File)
    .refine((file) => {
      if (file.name === "undefined") return true;
      return ACCEPTED_FILE_TYPES.includes(file.type);
    }, "file must a picture with png or jpg")
    .optional(),
  size: z.string().min(1),
  color: z.string().min(1),
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
    },
  });
  const userSession = session.user;
  // wer are asserting here because no way this gets called without users since it is intern
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
  if (
    hoodieVariantRecord &&
    userRecord &&
    locationRecord &&
    stickColorRecord &&
    sizeRecord
  ) {
    await prisma.order.create({
      data: {
        hoodieVariantId: hoodieVariantRecord.id,
        userId: userRecord.id,
        locationId: locationRecord.id,
        stickColorId: stickColorRecord.id,
        quantity: 1,
        sizeId: sizeRecord.id,
      },
    });
  }
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
    throw new Error("form should not be empty");
  }
  const validation = hoodieSchema.safeParse({
    file: formData?.get("file"),
    color: formData?.get("color"),
    size: formData?.get("size"),
  });

  if (!validation.success) {
    throw new Error(`${validation.error}`);
  }
  const { file, color, size } = validation.data;
  let fileName = "";
  try {
    if (file && file.name) {
      const buffer = Buffer.from(await file.arrayBuffer());
      if (buffer.length > 0) {
        fileName = file.name;
        const uploadDir = join(process.cwd(), "public");
        await writeFile(`${uploadDir}/${fileName}`, buffer);
      }
    }
  } catch (e) {
    console.log("an error occured with upload, no picture", e);
  }

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

  const checkHoodieExistence = await prisma.hoodieVariant.findFirst({
    where: {
      colorId: colorRecord.id,
    },
  });
  if (checkHoodieExistence !== null) {
    throw new Error("hoodie variation already exits");
  }
  const hoodieVariant = await prisma.hoodieVariant.create({
    data: {
      colorId: colorRecord.id,
      imagePath: fileName === "" ? null : fileName,
    },
  });
  await prisma.hoodieVariantSize.create({
    data: {
      hoodieVariantId: hoodieVariant.id,
      sizeId: sizeRecord.id,
    },
  });
  revalidatePath("/dashboard/product");
  redirect("/dashboard/product");
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

export async function changeAvailabilityAction(
  sizeName: string[],
  hoodieId: number
) {
  const session = await auth();
  if (!session || session?.user.role !== ADMIN) {
    redirect("/");
  }
  const sizeIds = await prisma.size
    .findMany({
      where: {
        name: {
          in: sizeName,
        },
      },
    })
    .then((val) => val.map((s) => s.id));

  await prisma.hoodieVariantSize.deleteMany({
    where: { hoodieVariantId: hoodieId },
  });
  await prisma.hoodieVariantSize.createMany({
    data: sizeIds.map((size) => {
      return {
        hoodieVariantId: hoodieId,
        sizeId: size,
      };
    }),
  });

  revalidatePath("/dashboard/product");
}
