import OrderFormComponent from "./OrderFormComponent";
import { prisma } from "@/prisma/prisma";

export default async function Order() {
  const hoodieVariants = await prisma.hoodieVariant.findMany({
    select: {
      Color: {
        select: {
          name: true,
          code: true,
        },
      },
      sizes: {
        select: {
          Size: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  return <OrderFormComponent hoodieVariants={hoodieVariants} />;
}
