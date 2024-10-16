"use client";

import { hoodieSize } from "@/app/lib/data";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
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

type ProductDetails = {
  hoodieId: number;
  sizes: string[];
  color: string;
  status: boolean;
  imagePath: string | null;
};

export default function ProductComponent({
  hoodieId,
  sizes,
  color,
  status,
  imagePath,
}: ProductDetails) {
  async function handleAvailability(state: boolean): Promise<void> {
    if (state !== status) {
      await changeAvailabilityAction(state, hoodieId);
    }
  }

  return (
    <Card className="border-none h-fit">
      <CardHeader className="absolute z-10 flex-col items-start gap-3">
        <p className="font-bold uppercase">size: {sizes.map((size) => size)}</p>
        <p className="font-bold ">color: {color}</p>
        <Dropdown backdrop="blur">
          <DropdownTrigger>
            <Button
              variant="ghost"
              endContent={status ? <IoMdCheckmark /> : <HiMiniXMark />}
              radius="sm"
            >
              change status: {status ? "available" : "unavailable"}
            </Button>
          </DropdownTrigger>
          <DropdownMenu variant="faded" aria-label="Static Actions">
            <DropdownItem
              onClick={() => handleAvailability(true)}
              key="available"
            >
              available
            </DropdownItem>
            <DropdownItem
              onClick={() => handleAvailability(false)}
              key="unavailable"
            >
              unavailable
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardHeader>
      <Image
        isBlurred
        removeWrapper
        alt="Card background"
        className="z-0 object-cover w-full h-full"
        fallbackSrc="https://nextui.org/images/hero-card-complete.jpeg"
        src={imagePath || "https://nextui.org/images/hero-card-complete.jpeg"}
      />
    </Card>
  );
}
