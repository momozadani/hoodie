import ProductComponent from "@/components/ProductComponent";
import { Button } from "@nextui-org/button";
import Link from "next/link";

export default function ProductPage() {
  
  return (
    <div className="w-full">
      <div className="p-3 bg-slate-600 flex justify-center w-full">
        <Button color="primary">
          <Link href="product/create">create a product</Link>
        </Button>
      </div>
      <div className="flex gap-3">
        <ProductComponent />
        <ProductComponent />
      </div>
    </div>
  );
}
