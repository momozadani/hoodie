"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";

const rows = [
  {
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
  },
  {
    key: "2",
    name: "Zoey Lang",
    role: "Technical Lead",
    status: "Paused",
  },
  {
    key: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active",
  },
  {
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
];

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

interface OrderType {}

export default function UserTable({ row }) {
  return (
    <Table
      aria-label="Example table with dynamic content"
      isStriped
      color="secondary"
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.role}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
