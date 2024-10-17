// npx prisma db push --force-reset
// npx prisma db seed
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { colors, hoodieSize } from "../app/lib/data";

async function main() {
  await prisma.color.deleteMany({});
  await prisma.size.deleteMany({});
  await prisma.hoodieVariant.deleteMany({});
  await prisma.hoodieVariantSize.deleteMany({});
  await prisma.location.deleteMany({});
  await prisma.stickColor.deleteMany({});
  await prisma.stickColor.createMany({
    data: [{ name: "schwarz" }, { name: "weiß" }],
  });
  await prisma.location.createMany({
    data: [{ name: "tower" }, { name: "home" }],
  });
  await prisma.color.createMany({
    data: colors,
  });
  await prisma.size.createMany({
    data: hoodieSize,
  });
  const allColors = await prisma.color.findMany();
  const allSizes = await prisma.size.findMany();
  const createHoodie = allColors.map((color) => ({
    colorId: color.id,
  }));
  await prisma.hoodieVariant.createMany({
    data: createHoodie,
  });
  const allHoodieVariants = await prisma.hoodieVariant.findMany();
  const allHoodieVariantSize = allHoodieVariants.flatMap((hoodieVar) =>
    allSizes.map((size) => ({
      hoodieVariantId: hoodieVar.id,
      sizeId: size.id,
    }))
  );
  await prisma.hoodieVariantSize.createMany({
    data: allHoodieVariantSize,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
