import ProductComponent from "@/components/ProductComponent";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { prisma } from "@/prisma/prisma";

export default async function ProductPage() {
  const hoodieVar = await prisma.hoodieVariant.findMany({
    include: {
      Size: {
        select: {
          name: true,
        },
      },
      Color: {
        select: {
          name: true,
        },
      },
    },
  });
  return (
    <div className="w-full flex flex-col">
      <Button color="primary" className="self-center mt-5">
        <Link href="product/create">create a product</Link>
      </Button>
      <div className="flex gap-3">
        {hoodieVar.map((hoodie) => {
          return (
            <ProductComponent
              hoodieId={hoodie.id}
              key={hoodie.id}
              size={hoodie.Size.name}
              color={hoodie.Color.name}
              status={hoodie.available}
              imagePath={hoodie.imagePath}
            />
          );
        })}
      </div>
    </div>
  );
}
