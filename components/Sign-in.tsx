"use client";

import { Button } from "@nextui-org/react";
import { signInAction } from "@/app/action";
import { BiLogIn } from "react-icons/bi";

export default function SignIn() {
  return (
    <form action={signInAction}>
      <Button
        variant="ghost"
        color="primary"
        type="submit"
        isIconOnly
        className="w-10"
        endContent={<BiLogIn size={20} />}
      ></Button>
    </form>
  );
}
