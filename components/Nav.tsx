"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { AcmeLogo } from "@/components/AcmeLogo";
import ActiveRoute from "./ActiveRoute";
import SignIn from "./Sign-in";
import { Session } from "next-auth";
import { Avatar } from "@nextui-org/avatar";

export default function Nav({ session }: { session: Session | null }) {
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit">HoodieHub</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <ActiveRoute path="/">Home</ActiveRoute>
        {session?.user.role === "admin" ? (
          <ActiveRoute path="/dashboard/users">Dashboard</ActiveRoute>
        ) : null}
        <ActiveRoute path="/order">Bestellen</ActiveRoute>
        <ActiveRoute path="/status">Status</ActiveRoute>
      </NavbarContent>
      <NavbarContent justify="end">
        {session ? (
          <NavbarItem className="flex">
            <Avatar src={session.user.image!} />
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
