"use client";

import { Button } from "@nextui-org/button";
import { Card, CardHeader } from "@nextui-org/card";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Image } from "@nextui-org/image";
import { HiMiniXMark } from "react-icons/hi2";
import { IoMdCheckmark } from "react-icons/io";
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
          classNames={{
            //mainWrapper: "bg-transparent",
            base: "border",
            trigger: "bg-transparent  data-[hover=true]:bg-transparent",
          }}
          label="Edit the available size"
          selectionMode="multiple"
          defaultSelectedKeys={new Set<string>([...sizes])}
          onSelectionChange={(sizes) => handleSelectionChange(sizes)}
        >
          {hoodieSize.map((size) => {
            return <SelectItem key={size.name}>{size.name}</SelectItem>;
          })}
        </Select>
        <h1 className="font-bold">Color: {color}</h1>
      </CardHeader>
      <Image
        isBlurred
        removeWrapper
        alt="Card background"
        className="z-0 object-cover w-full h-full "
        fallbackSrc="https://nextui.org/images/hero-card-complete.jpeg"
        src={imagePath ?? "https://nextui.org/images/hero-card-complete.jpeg"}
      />
    </Card>
  );
}
