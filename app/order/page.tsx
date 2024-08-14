"use client"

import { Button } from "@nextui-org/button";
import { create } from "../action";
import { animals, hoodieSize } from "../lib/data";
import { Select, SelectItem } from "@nextui-org/select";


export default function Order() {

  return (
    <div className="flex-col mx-64">
      <form className="self-center w-full" action={create}>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
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
          </div>
        <div className=" mt-7">
          <Button color="primary" variant="faded" type="submit">
            submit
          </Button>
        </div>
      </form>
    </div>
  );
}
