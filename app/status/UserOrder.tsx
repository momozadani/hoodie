"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
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

interface OrderType {
  id: number;
  user: {
    firstName: string;
    lastName: string;
  };
  HoodieVariant: {
    Size: {
      name: string;
    };
    Color: {
      name: string;
    };
  };
  location: {
    name: string;
  };
  StickColor: {
    name: string;
  };
}

export default function UserTable({ rows }: { rows: OrderType[] }) {
  return (
    <>
      <h1 className="flex items-center justify-center py-4">
        Betelllung von {rows[0].user.firstName} {rows[0].user.lastName}
      </h1>
      <Table aria-label="table with User content" isStriped color="secondary">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.HoodieVariant.Size.name}</TableCell>
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
