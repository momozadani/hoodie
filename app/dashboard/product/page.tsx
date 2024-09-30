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
    <div className="w-full">
      <div className="p-3 bg-slate-600 flex justify-center w-full">
        <Button color="primary">
          <Link href="product/create">create a product</Link>
        </Button>
      </div>
      <div className="flex gap-3">
        {hoodieVar.map((hoodie) => {
          return (
            <ProductComponent
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
