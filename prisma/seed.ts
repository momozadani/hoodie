import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { colors, hoodieSize } from "../app/lib/data";

async function main() {
  await prisma.color.deleteMany({});
  await prisma.size.deleteMany({});

  await prisma.color.createMany({
    data: colors,
  });
  await prisma.size.createMany({
    data: hoodieSize,
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
