"use client";

import { hoodieSize } from "@/app/lib/data";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

type ProductDetails = {
  size: string;
  color: string;
  status: boolean;
  imagePath: string | null;
};

export default function ProductComponent({
  size,
  color,
  status,
  imagePath,
}: ProductDetails) {
  return (
    <Card className="border-none h-fit">
      <CardHeader className="flex-col items-start">
        <p className="font-bold uppercase text-tiny">size: {size}</p>
        <small className="text-default-500">color: {color}</small>
        <h4 className="font-bold text-large">
          status: {status ? "available" : "not available"}
        </h4>
      </CardHeader>
      <CardBody className="overflow-visible">
        <Image
          isBlurred
          isZoomed
          alt="Card background"
          className="object-cover"
          fallbackSrc="https://nextui.org/images/hero-card-complete.jpeg"
          src={imagePath || "https://nextui.org/images/hero-card-complete.jpeg"}
          width={200}
          height={200}
        />
      </CardBody>
    </Card>
  );
}
