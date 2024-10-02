"use client";

import { uploadHoodieVariantAction } from "@/app/action";
import { Button } from "@nextui-org/button";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Image } from "@nextui-org/image";

type ColorAndSize = {
  id: number;
  name: string;
  code?: string;
};

export default function ProductCreateForm({
  colors,
  sizes,
}: {
  colors: ColorAndSize[];
  sizes: ColorAndSize[];
}) {
  return (
    <div className="flex flex-col items-center justify-center w-full pt-6 gap-4">
      <h1>Create a Hoodie </h1>
      <form
        action={uploadHoodieVariantAction}
        className="flex flex-col w-1/4 gap-4"
      >
        <Autocomplete label="Select a color" className="max-w-xs" name="color">
          {colors.map((color) => (
            <AutocompleteItem
              key={color.id}
              value={color.name}
              endContent={
                <Image
                  src={`/colors/${color.code}.png`}
                  alt="hello"
                  width={20}
                  height={20}
                />
              }
            >
              {color.name}
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <Autocomplete label="Select a size" className="max-w-xs" name="size">
          {sizes.map((size) => (
            <AutocompleteItem key={size.id} value={size.name}>
              {size.name}
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <div className="flex items-center justify-center ">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <IoCloudUploadOutline size={44} />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              name="file"
            />
          </label>
        </div>

        <Button
          color="primary"
          variant="ghost"
          type="submit"
          className="self-center w-1/2"
        >
          submit
        </Button>
      </form>
    </div>
  );
}
