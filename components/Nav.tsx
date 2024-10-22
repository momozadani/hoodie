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
import { ThemeSwitcher } from "./ThemeSwitcher";
import HoodieHub from "@/public/hoodieHub.jpeg";
import Image from "next/image";
import { GiHoodie } from "react-icons/gi";

export default function Nav({ session }: { session: Session | null }) {
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <GiHoodie size={40} />
      </NavbarBrand>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <ActiveRoute path="/" name="/">
          Home
        </ActiveRoute>
        {session?.user.role === "admin" ? (
          <ActiveRoute path="/dashboard/users" name="dashboard">
            Dashboard
          </ActiveRoute>
        ) : null}
        <ActiveRoute path="/order" name="order">
          Bestellen
        </ActiveRoute>
        <ActiveRoute path="/status" name="status">
          Status
        </ActiveRoute>
      </NavbarContent>
      <NavbarContent justify="end">
        {session ? (
          <NavbarItem className="flex">
            <Avatar
              src={
                session.user.image ??
                "https://xsgames.co/randomusers/avatar.php?g=male"
              }
            />
          </NavbarItem>
        ) : (
          <>
            <NavbarItem className="flex">
              <SignIn />
            </NavbarItem>
          </>
        )}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
