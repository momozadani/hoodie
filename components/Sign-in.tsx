"use client";

import { Button } from "@nextui-org/react";
import { signInAction } from "@/app/action";

export default function SignIn() {
  return (
    <form action={signInAction}>
      <Button variant="ghost" color="primary" type="submit">
        Sign in
      </Button>
    </form>
  );
}
