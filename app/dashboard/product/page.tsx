import ProductComponent from "@/components/ProductComponent";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { prisma } from "@/prisma/prisma";

export default async function ProductPage() {
  const hoodieVar = await prisma.hoodieVariant.findMany({
    include: {
      Color: {
        select: {
          name: true,
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
  return (
    <div className="flex flex-col w-full">
      <Button color="primary" className="self-center my-5">
        <Link href="product/create">create a Hoodie</Link>
      </Button>
      <div className="grid grid-cols-3 gap-2">
        {hoodieVar.map((hoodie) => {
          return (
            <ProductComponent
              hoodieId={hoodie.id}
              key={hoodie.id}
              sizes={hoodie.sizes.map((sizeArray) => sizeArray.Size.name)}
              color={hoodie.Color.name}
              status={true}
              imagePath={hoodie.imagePath}
            />
          );
        })}
      </div>
    </div>
  );
}
