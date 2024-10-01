"use client";

import { Input } from "@nextui-org/input";
import { uploadHoodieVariantAction } from "@/app/action";
import { Button } from "@nextui-org/button";
import { IoCloudUploadOutline } from "react-icons/io5";

type ColorAndSize = {
    id: number;
    name: string;
}

export default function ProductCreateForm({
  colors,
  sizes,
}: {
  colors: ColorAndSize[];
  sizes: ColorAndSize[];
}) {
  return (
    <div className="flex items-center justify-center w-full pt-6">
      <form
        action={uploadHoodieVariantAction}
        className="flex flex-col w-1/4 gap-4"
      >
        <Input
          label="Colors"
          labelPlacement="outside"
          list="colors"
          type="text"
          name="colors"
          placeholder=" "
        />
        <datalist id="colors">
          {colors.map((color) => {
            return <option key={color.id}>{color.name}</option>;
          })}
        </datalist>

        <Input
          label="Size"
          labelPlacement="outside"
          list="sizes"
          type="text"
          name="sizes"
          placeholder=" "
        />
        <datalist id="sizes">
          {sizes.map((size) => {
            return <option key={size.id}>{size.name}</option>;
          })}
        </datalist>

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
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
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
