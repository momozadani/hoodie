"use client";

import { Button } from "@nextui-org/button";
import { orderHoodieAction } from "../action";
import { colors, hoodieSize } from "../lib/data";
import { Select, SelectItem } from "@nextui-org/select";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { useFormState } from "react-dom";
import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Checkbox, CheckboxGroup } from "@nextui-org/checkbox";

export default function Order() {
  const [isSelected, setIsSelected] = useState(false);
  const [state, formAction, pending] = useFormState(orderHoodieAction, {
    message: "input not valid",
  });
  const [isConsent, setIsConsent] = useState<string[]>([]);
  return (
    <div className="mx-80 min-h-screen flex justify-center">
      <form className="flex flex-col justify-evenly w-1/2" action={formAction}>
        <div className="flex gap-6">
          <Select
            name="size"
            label="Favorite size"
            placeholder="Select a size for hoodie"
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
          classNames={{
            label: "text-black",
          }}
          label="Ich möchte den Stick auf meinem Hoodie in der Farbe..."
          name="stickColor"
          errorMessage={"Bitte eine Farbe auswählen"}
        >
          <Radio value="schwarz">schwarz</Radio>
          <Radio value="weiß">weiß</Radio>
        </RadioGroup>

        <RadioGroup
          classNames={{
            label: "text-black",
          }}
          label="Ich möchte den Stick auf meinem Hoodie in der Farbe..."
          name="location"
          defaultValue={"tower"}
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
          <label htmlFor="consent">
            Ich erkläre mich damit einverstanden, dass die einmalige monatliche
            Eigenleistung in Höhe von 15,00 Euro + 6,99€ für den Versand, falls
            zutreffend von meinem Nettoverdienst einbehalten wird
          </label>
          <Checkbox
            type="checkbox"
            name="consent"
            className="mt-8"
            id="consent"
            value="true"
            required
          >
            Ja*
          </Checkbox>
          <input type="hidden" name="consent" value="false" />
        </div>
        <div>
          <label htmlFor="customerNumber">
            *Bitte trage hier noch deine Personalnummer ein (diese benötigt HR
            für die Abrechnung, du findest sie auf deiner digitalen
            Gehaltsabrechnung)
          </label>
          <Input
            className="pt-3"
            id="customerNumber"
            name="customerNumber"
            type="number"
            inputMode="numeric"
            isClearable
          />
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
