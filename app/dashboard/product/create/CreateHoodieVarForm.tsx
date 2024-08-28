"use client";

import { uploadAction } from "@/app/action";
import { useFormState } from "react-dom";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { useState } from "react";

export default function CreateHoodieVarForm() {
  const [state, formAction, pending] = useFormState(uploadAction, {
    message: "input not validated",
  });
  const [checked, setChecked] = useState(false);
  return (
    <form action={formAction} className="flex flex-col gap-7 pl-9 pt-9">
      <Input label="Size" type="text" name="size" required />

      <Input label="Color" type="text" name="color" required />

      <Input label="Quantity" type="number" name="quantity" required />

      <Checkbox
        radius="md"
        name="available"
        value={checked + ""}
        onClick={() => setChecked(!checked)}
      >
        is the product available ?
      </Checkbox>

      <Input
        className="block w-full"
        label="Upload Image"
        id="file"
        name="file"
        type="file"
      />

      <Button type="submit" color="primary" isDisabled={pending}>
        Create Hoodie Variant
      </Button>
    </form>
  );
}
