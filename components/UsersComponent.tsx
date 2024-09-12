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
import { IoCloudDownloadSharp } from "react-icons/io5";

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
      console.log("this is data", data);
    } catch (err) {
      console.log("i am getting an error", err);
    }
  }
  return (
    <div className="w-full flex flex-col pt-10">
      <Button
        startContent={<IoCloudDownloadSharp />}
        className="w-1/6 self-end"
        color="success"
        onClick={handleExport}
      >
        export to csv
      </Button>
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
    </div>
  );
}
