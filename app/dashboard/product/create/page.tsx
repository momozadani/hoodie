import ProductCreateForm from "@/components/ProductForm";
import { prisma } from "@/prisma/prisma";

export default async function CreateProduct() {
    const colors = await prisma.color.findMany()
    const sizes = await prisma.size.findMany()

  return (
    <div className="w-full">
      <ProductCreateForm colors={colors} sizes={sizes} />
    </div>
  );
}
