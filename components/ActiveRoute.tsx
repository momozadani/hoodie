"use client"

import { NavbarItem } from "@nextui-org/navbar";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import React from "react";

export default function ActiveRoute( {path,children}:{path:string,children:React.ReactNode}) {
    const pathname = usePathname()
  return (
    <NavbarItem  isActive={pathname === path}  >
        <Link href={`${path}`} >
        {children}
      </Link>
    </NavbarItem>
  );
}
