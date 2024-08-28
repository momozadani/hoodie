"use client";

import { Button } from "@nextui-org/button";
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";

export default function UsersComponent({
  columns,
  rows,
}: {
  columns: {
    key: string;
    label: string;
  }[];
  rows: {
    key: string;
    name: string;
    role: string;
    status: string;
  }[];
}) {
  async function handleExport() {
    try {
      const response = await fetch("/api/exportCSV", {
        method: "GET",
      });
      const data = await response.json();
    } catch (err) {
      console.log("i am getting an error", err);
    }
  }
  return (
    <>
      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Button color="primary" onClick={handleExport}>
        click me to make a request
      </Button>
    </>
  );
}
