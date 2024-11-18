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
      hoodieVariantSize: {
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
  const hoodiesWithSizes = hoodieVariants.filter(
    (variant) => variant.hoodieVariantSize.length > 0
  );
  return <OrderFormComponent hoodieVariants={hoodiesWithSizes} />;
}
