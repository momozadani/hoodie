"use client";

import { NavbarItem } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function ActiveRoute({
  path,
  name,
  children,
}: {
  path: string;
  name: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Ensure the home page is only activated when pathname is exactly "/"
  const isActive = name === "/" ? pathname === "/" : pathname.includes(name);
  console.log("pathname", pathname);
  return (
    <NavbarItem isActive={isActive}>
      <Link href={`${path}`} color={isActive ? "primary" : "foreground"}>
        {children}
      </Link>
    </NavbarItem>
  );
}
