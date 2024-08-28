"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { AcmeLogo } from "@/components/AcmeLogo";
import { auth, signIn } from "@/auth";
import ActiveRoute from "./ActiveRoute";
import SignIn from "./Sign-in";
import { Session } from "next-auth";

export default function Nav({ session }: { session: Session | null }) {
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit">Shop</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <ActiveRoute path="/">Home</ActiveRoute>
        <ActiveRoute path="/dashboard">Dashboard</ActiveRoute>
        <ActiveRoute path="/order">Bestellen</ActiveRoute>
        <ActiveRoute path="/status">Status</ActiveRoute>
      </NavbarContent>
      <NavbarContent justify="end">
        {session ? (
          <NavbarItem className="flex">
            <Button
              radius="full"
              disabled
              className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg "
            >
              logged in
            </Button>
          </NavbarItem>
        ) : (
          <>
            <NavbarItem className="flex">
              <SignIn />
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
