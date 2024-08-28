"use client";

import { Button } from "@nextui-org/button";
import { createAction } from "../action";
import { colors, hoodieSize } from "../lib/data";
import { Select, SelectItem } from "@nextui-org/select";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { useFormState } from "react-dom";
import { Checkbox } from "@nextui-org/checkbox";
import { useState } from "react";

export default function Order() {
  const [isSelected, setIsSelected] = useState(false);
  const [state, formAction, pending] = useFormState(createAction, {
    message: "input not validated",
  });
  return (
    <div className="mx-80 min-h-screen flex justify-center">
      <form className="flex flex-col justify-evenly w-1/2" action={formAction}>
        <div className="flex gap-6">
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
            required
            name="color"
            label="Favorite color"
            placeholder="Select a color for hoodie"
            className="max-w-xs"
          >
            {colors.map((color) => (
              <SelectItem key={color}>{color}</SelectItem>
            ))}
          </Select>
        </div>
        <RadioGroup
          label="Ich möchte den Stick auf meinem Hoodie in der Farbe..."
          name="stickColor"
        >
          <Radio value="schwarz">schwarz</Radio>
          <Radio value="weiß">weiß</Radio>
        </RadioGroup>

        <RadioGroup
          label="Ich möchte den Stick auf meinem Hoodie in der Farbe..."
          name="location"
        >
          <Radio required value="tower">
            in den Tower
          </Radio>
          <Radio required value="home">
            zu mir nach Hause (bitte beachte, dass das mit Mehrkosten (6,99€)
            verbunden ist, die du selbst trägst)
          </Radio>
        </RadioGroup>

        <div>
          <div>
            Ich erkläre mich damit einverstanden, dass die einmalige monatliche
            Eigenleistung in Höhe von 15,00 Euro + 6,99€ für den Versand, falls
            zutreffend von meinem Nettoverdienst einbehalten wird
          </div>
          <input
            type="checkbox"
            name="consent"
            className="mt-8"
            defaultValue={"off"}
          />
          <span className="ml-4">ja*</span>
        </div>

        <Button
          color="primary"
          variant="ghost"
          type="submit"
          disabled={pending}
        >
          submit
        </Button>
      </form>
    </div>
  );
}
