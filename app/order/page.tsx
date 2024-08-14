"use client";

import { Button } from "@nextui-org/button";
import { create } from "../action";
import { colors, hoodieSize } from "../lib/data";
import { Select, SelectItem } from "@nextui-org/select";
import { RadioGroup, Radio } from "@nextui-org/radio";

export default function Order() {
  return (
    <div className="mx-24 mt-16 min-h-screen">
      <form
        className="flex flex-col justify-between items-center w-full"
        action={create}
      >
        <Select
          name="size"
          label="Favorite size"
          placeholder="Select an size for hoodie"
          className="max-w-xs"
        >
          {hoodieSize.map((hoodie) => (
            <SelectItem key={hoodie}>{hoodie}</SelectItem>
          ))}
        </Select>

        <Select
          name="size"
          label="Favorite color"
          placeholder="Select a color for hoodie"
          className="max-w-xs mt-8"
        >
          {colors.map((color) => (
            <SelectItem key={color}>{color}</SelectItem>
          ))}
        </Select>
        <RadioGroup
          label="Ich möchte den Stick auf meinem Hoodie in der Farbe..."
          className="mt-8"
        >
          <Radio value="schwarz">Buenos Aires</Radio>
          <Radio value="weiß">Sydney</Radio>
        </RadioGroup>
        <div className=" mt-7">
          <Button color="primary" variant="faded" type="submit">
            submit
          </Button>
        </div>
      </form>
    </div>
  );
}
