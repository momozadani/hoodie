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
  allSizes: AllSizes;
  imagePath: string | null;
};
type AllSizes = {
  id: number;
  name: string;
}[];

export default function ProductComponent({
  hoodieId,
  sizes,
  color,
  allSizes,
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
  let newImagePath = "";
  if (imagePath === null || imagePath === undefined) {
    newImagePath = "https://nextui.org/images/hero-card-complete.jpeg";
  } else {
    newImagePath = "/" + imagePath;
  }

  return (
    <Card className="border-none h-fit radius-lg">
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
          {allSizes.map((size) => {
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
        height={200}
        className="z-0 object-cover w-full h-full brightness-50"
        fallbackSrc="https://nextui.org/images/hero-card-complete.jpeg"
        src={newImagePath}
      />
    </Card>
  );
}
