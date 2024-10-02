"use client";

import { Button } from "@nextui-org/button";
import { orderHoodieAction } from "@/app/action";
import { colors, hoodieSize } from "@/app/lib/data";
import { Select, SelectItem } from "@nextui-org/select";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { Input } from "@nextui-org/input";
import { Checkbox, CheckboxGroup } from "@nextui-org/checkbox";
import { Image } from "@nextui-org/image";

export default function Order() {
  const [shippingCost, setShippingCost] = useState("tower");
  const [state, formAction, pending] = useFormState(orderHoodieAction, {
    message: [],
  });
  const [hasError, setHasError] = useState({
    stickColor: false,
    consent: false,
    customerNumber: false,
    size: false,
    color: false,
  });
  useEffect(() => {
    if (Array.isArray(state?.message)) {
      const newError = { ...hasError };
      state.message.forEach((error) => {
        if (error.path.includes("stickColor")) {
          newError.stickColor = true;
        }
        if (error.path.includes("consent")) {
          newError.consent = true;
        }
        if (error.path.includes("customerNumber")) {
          newError.customerNumber = true;
        }
        if (error.path.includes("size")) {
          newError.size = true;
        }
        if (error.path.includes("color")) {
          newError.color = true;
        }
      });
      setHasError(newError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  function handleFocus(field: string) {
    setHasError((prevError) => ({ ...prevError, [field]: false }));
  }

  return (
    <div className="flex justify-center min-h-screen gap-4">
      <form className="flex flex-col w-1/2 justify-evenly" action={formAction}>
        <div className="flex gap-6">
          <Select
            color="primary"
            name="size"
            label="Favorite size"
            placeholder="Select a size for hoodie"
            className="max-w-xs"
            errorMessage="please select a size"
            isInvalid={hasError.size}
            onFocus={() => handleFocus("size")}
          >
            {hoodieSize.map((hoodie) => (
              <SelectItem textValue={hoodie.name} key={hoodie.name}>
                {hoodie.name}
              </SelectItem>
            ))}
          </Select>

          <Select
            color="primary"
            required
            name="color"
            label="Favorite color"
            placeholder="Select a color for hoodie"
            className="max-w-xs"
            errorMessage="please select a color"
            isInvalid={hasError.color}
            onFocus={() => handleFocus("color")}
          >
            {colors.map((color) => (
              <SelectItem
                endContent={
                  <Image
                    width={20}
                    height={20}
                    src={`/colors/${color.code}` + ".png"}
                    alt={color.name}
                  />
                }
                key={color.code}
              >
                {color.name}
              </SelectItem>
            ))}
          </Select>
        </div>
        <RadioGroup
          color="primary"
          label="Ich möchte den Stick auf meinem Hoodie in der Farbe..."
          name="stickColor"
          errorMessage="please select a stick color"
          isRequired
          isInvalid={hasError.stickColor}
          onFocus={() => handleFocus("stickColor")}
        >
          <Radio value="schwarz">schwarz</Radio>
          <Radio value="weiß">weiß</Radio>
        </RadioGroup>

        <RadioGroup
          onValueChange={(val) => setShippingCost(val)}
          color="primary"
          label="Ich möchte den Stick auf meinem Hoodie in der Farbe..."
          name="location"
          defaultValue={"tower"}
          value={shippingCost}
        >
          <Radio required value="tower">
            in den Tower
          </Radio>
          <Radio required value="home">
            zu mir nach Hause (bitte beachte, dass das mit Mehrkosten (6,99€)
            verbunden ist, die du selbst trägst)
          </Radio>
        </RadioGroup>

        <CheckboxGroup
          label={`Ich erkläre mich damit einverstanden, dass die einmalige monatliche
            Eigenleistung in Höhe von 15,00 Euro${
              shippingCost === "home" ? " + 6,99€ für den Versand" : ""
            }, falls
            zutreffend von meinem Nettoverdienst einbehalten wird`}
          errorMessage="please consent"
          isInvalid={hasError.consent}
          onFocus={() => handleFocus("consent")}
        >
          <input type="hidden" name="consent" value="" />
          <Checkbox
            type="checkbox"
            name="consent"
            value="true"
            required
            className="pt-4"
          >
            Ja*
          </Checkbox>
        </CheckboxGroup>

        <Input
          classNames={{
            label: "text-medium text-foreground-500",
          }}
          color="primary"
          label="*Bitte trage hier noch deine Personalnummer ein (diese benötigt HR
            für die Abrechnung, du findest sie auf deiner digitalen
            Gehaltsabrechnung)"
          placeholder=" "
          id="customerNumber"
          name="customerNumber"
          type="number"
          inputMode="numeric"
          labelPlacement="outside"
          isClearable
          errorMessage="number is too short"
          isInvalid={hasError.customerNumber}
          onFocus={() => handleFocus("customerNumber")}
          onWheel={(e) => e.currentTarget.blur()}
        />

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
