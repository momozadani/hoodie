"use client"; // Error boundaries must be Client Components

import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useEffect } from "react";
import { MdError } from "react-icons/md";
import { Image } from "@nextui-org/image";
import notFound from "@/public/404Page.png";
import { IoReturnDownBack } from "react-icons/io5";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="relative w-full overflow-clip max-h-[80vh]">
      <Image
        isBlurred
        src={notFound.src}
        alt="NextUI Album Cover"
        radius="full"
        className="scale-95 -translate-y-9"
      />

      <div className="absolute top-0 bottom-0 z-10 flex flex-col items-center justify-center w-full">
        <div
          className="relative flex items-center justify-center p-3 mb-3 text-red-700 bg-red-100 border border-red-400 rounded"
          role="alert"
        >
          <strong className="font-bold">
            Something went wrong! {error.message}
          </strong>
          <MdError className="ml-3" />
        </div>

        <Button color="secondary" endContent={<IoReturnDownBack />}>
          <Link href="/dashboard/users"> Go Back</Link>
        </Button>
      </div>
    </div>
  );
}
