"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { UserAndOrder } from "@/types/user";
const columns = [
  {
    key: "size",
    label: "SIZE",
  },
  {
    key: "color",
    label: "COLOR",
  },
  {
    key: "stickColor",
    label: "STICK-COLOR",
  },
  {
    key: "location",
    label: "LOCATION",
  },
];

export default function UserTable({ rows }: { rows: UserAndOrder }) {
  return (
    <>
      <h1 className="flex items-center justify-center py-4">
        Betelllungen von {rows.firstName} {rows.lastName}
      </h1>
      <Table aria-label="table with User content" isStriped color="secondary">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows.orders}>
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.hoodieVariantSize.Size.name}</TableCell>
              <TableCell>{item.HoodieVariant.Color.name}</TableCell>
              <TableCell>{item.StickColor.name}</TableCell>
              <TableCell>{item.location.name}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
