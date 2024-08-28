"use client";

import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function Sidebar() {
  const value = usePathname();
  const correctPath = useMemo(() => {
    return value.includes("product")
      ? "product"
      : value.includes("users")
      ? "users"
      : "main";
  }, [value]);

  return (
    <div className="flex w-1/4 h-screen">
      <Listbox
        aria-label="Listbox Variants"
        color={"primary"}
        variant={"faded"}
        selectionMode="single"
        selectedKeys={new Set([correctPath as string])}
      >
        <ListboxItem key="main" href="/dashboard">
          Dashboard
        </ListboxItem>
        <ListboxItem key="users" href="/dashboard/users">
          Users
        </ListboxItem>
        <ListboxItem key="product" href="/dashboard/product">
          Product Settings
        </ListboxItem>
      </Listbox>
    </div>
  );
}
