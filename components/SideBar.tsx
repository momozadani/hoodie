"use client";

import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function Sidebar() {
  const value = usePathname();
  const correctPath = useMemo(() => {
    return value.includes("users") ? "users" : "product";
  }, [value]);

  return (
    <div className="flex w-1/4 border-r border-divider">
      <Listbox
        aria-label="Listbox Variants"
        color={"primary"}
        variant={"faded"}
        selectionMode="single"
        selectedKeys={new Set([correctPath as string])}
      >
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
