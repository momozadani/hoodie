"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

export default function ProductComponent() {
  return (
    <Card className="h-fit border-none">
      <CardHeader className="flex-col items-start">
        <p className="text-tiny uppercase font-bold">size</p>
        <small className="text-default-500">color</small>
        <h4 className="font-bold text-large">status</h4>
      </CardHeader>
      <CardBody className="overflow-visible">
        <Image
          isBlurred
          isZoomed
          alt="Card background"
          className="object-cover"
          src="https://nextui.org/images/hero-card-complete.jpeg"
          width={200}
          height={200}
        />
      </CardBody>
    </Card>
  );
}
