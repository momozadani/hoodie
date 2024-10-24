"use client";

import { Button } from "@nextui-org/button";
import { orderHoodieAction } from "@/app/action";
import { Select, SelectItem } from "@nextui-org/select";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { Input } from "@nextui-org/input";
import { Checkbox, CheckboxGroup } from "@nextui-org/checkbox";
import { Image } from "@nextui-org/image";

type HoodieVarType = {
  hoodieVariantSize: {
    Size: {
      name: string;
    };
  }[];
  Color: {
    name: string;
    code: string;
  };
}[];

export default function OrderFormComponent({
  hoodieVariants,
}: {
  hoodieVariants: HoodieVarType;
}) {
  const [shippingCost, setShippingCost] = useState("tower");
  const [state, formAction, pending] = useFormState(orderHoodieAction, {
    message: [],
  });
  const [colorList, setColorList] = useState(
    hoodieVariants.map((initialColorList) => initialColorList.Color)
  );
  // initialize all of the sizes in a set
  const hoodieSize = new Set<string>();
  hoodieVariants.map((variant) => {
    variant.hoodieVariantSize.map((size) => {
      hoodieSize.add(size.Size.name);
    });
  });
  const [sizeList, setSizeList] = useState(Array.from(hoodieSize.values()));

  // for handling the case when the size does not exists in the color when size already selected
  const [selectedSize, setSelectedSize] = useState(new Set<string>([""]));
  const [selectedColor, setSelectedColor] = useState(new Set<string>([""]));

  const [hasError, setHasError] = useState({
    stickColor: false,
    consent: false,
    customerNumber: false,
    size: false,
    color: false,
  });
  //  this useEffect could be removed prob.
  //  just do not use the hasError ? kein Bock
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
  function handleColorSelect(color: string | undefined) {
    if (color === undefined) {
      setSelectedColor(new Set<string>([""]));
      setSizeList(Array.from(hoodieSize.values()));
      return;
    }
    setSelectedColor(new Set<string>([color]));
    const colorSizes = hoodieVariants
      .filter((variant) => {
        return variant.Color.name === color;
      })
      .flatMap((variant) =>
        variant.hoodieVariantSize.map((size) => size.Size.name)
      );
    setSizeList(colorSizes);
    const checkSizePredi = (size: string) => selectedSize.has(size);
    if (!colorSizes.some(checkSizePredi)) {
      setSelectedSize(new Set<string>([""]));
    }
  }

  function handleSizeSelect(size: string | undefined): void {
    if (size !== undefined) {
      const newColorList = hoodieVariants.filter((variant) => {
        return variant.hoodieVariantSize.some((val) => val.Size.name === size);
      });
      setColorList(newColorList.map((c) => c.Color));
      setSelectedSize(new Set<string>([size]));
    } else {
      setSelectedSize(new Set<string>([""]));
      setColorList(
        hoodieVariants.map((initialColorList) => initialColorList.Color)
      );
    }
  }

  return (
    <div className="flex justify-center min-h-screen gap-4">
      <form className="flex flex-col w-1/2 justify-evenly" action={formAction}>
        <div className="flex gap-6">
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
            selectedKeys={selectedColor}
            onSelectionChange={(val) => handleColorSelect(val.currentKey)}
          >
            {colorList.map((color) => (
              <SelectItem
                endContent={
                  <Image
                    width={20}
                    height={20}
                    fallbackSrc={
                      "https://nextui.org/images/card-example-2.jpeg"
                    }
                    src={`/colors/${color.code}` + ".png"}
                    alt={color.name}
                  />
                }
                key={color.name}
                textValue={color.name}
              >
                {color.name}
              </SelectItem>
            ))}
          </Select>
          <Select
            color="primary"
            name="size"
            label="Favorite size"
            placeholder="Select a size for hoodie"
            className="max-w-xs"
            errorMessage="please select a size"
            isInvalid={hasError.size}
            selectedKeys={selectedSize}
            onSelectionChange={(val) => handleSizeSelect(val.currentKey)}
            onFocus={() => handleFocus("size")}
          >
            {sizeList.map((size) => (
              <SelectItem textValue={size} key={size}>
                {size}
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
