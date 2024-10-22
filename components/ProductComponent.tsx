"use client";

import { Card, CardHeader } from "@nextui-org/card";

import { Image } from "@nextui-org/image";
import { changeAvailabilityAction } from "@/app/action";
import { Select, SelectItem } from "@nextui-org/select";
import { hoodieSize } from "@/app/lib/data";
import { SharedSelection } from "@nextui-org/system";

type ProductDetails = {
  hoodieId: number;
  sizes: string[];
  color: string;
  imagePath: string | null;
};

export default function ProductComponent({
  hoodieId,
  sizes,
  color,
  imagePath,
}: ProductDetails) {
  async function handleSelectionChange(
    sizeSet: SharedSelection
  ): Promise<void> {
    const sizeList: string[] = [];
    if (sizeSet !== "all") {
      sizeSet.forEach((size) => sizeList.push(size as string));
    }
    await changeAvailabilityAction(sizeList, hoodieId);
  }

  return (
    <Card className="border-none h-fit">
      <CardHeader className="absolute z-10 flex-col items-start gap-3">
        <Select
          variant="bordered"
          color="primary"
          label="Edit the available size"
          selectionMode="multiple"
          classNames={{
            value: "text-white",
          }}
          defaultSelectedKeys={new Set<string>([...sizes])}
          onSelectionChange={(sizes) => handleSelectionChange(sizes)}
        >
          {hoodieSize.map((size) => {
            return (
              <SelectItem textValue={size.name} key={size.name}>
                {size.name}
              </SelectItem>
            );
          })}
        </Select>
        <h1 className="font-bold dark:text-white">Color: {color}</h1>
      </CardHeader>
      <Image
        isBlurred
        removeWrapper
        alt="Card background"
        className="z-0 object-cover w-full h-full brightness-50"
        fallbackSrc="https://nextui.org/images/hero-card-complete.jpeg"
        src={imagePath ?? "https://nextui.org/images/hero-card-complete.jpeg"}
      />
    </Card>
  );
}
