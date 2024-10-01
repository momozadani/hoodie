"use client";

import { Input } from "@nextui-org/input";
import { uploadHoodieVariantAction } from "@/app/action";
import { Button } from "@nextui-org/button";
import { FaImages } from "react-icons/fa";
import { IoCloudUpload, IoCloudUploadOutline } from "react-icons/io5";

export default function ProductCreateForm() {
  return (
    <div className="w-full flex justify-center items-center pt-6">
      <form
        action={uploadHoodieVariantAction}
        className="flex flex-col gap-4  w-1/4"
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
          <option>Volvo</option>
          <option>Saab</option>
          <option>Mercedes</option>
          <option>Audi</option>
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
          <option>XL</option>
          <option>S</option>
          <option>X</option>
          <option>XXL</option>
        </datalist>

        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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

        <Button color="primary" variant="ghost" type="submit">
          submit
        </Button>
      </form>
    </div>
  );
}
