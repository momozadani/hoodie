import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { AcmeLogo } from "@/components/AcmeLogo";
import { auth, signIn } from "@/auth";
import ActiveRoute from "./ActiveRoute";
import SignIn from "./sign-in";

export default async function Nav() {
  const session = await auth();

  return (
    <Navbar>
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
            <Button color="success" disabled>
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
