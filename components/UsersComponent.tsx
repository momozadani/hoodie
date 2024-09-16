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
import { User, FlattenedUser } from "../types/user";

interface DataUser {
  users: User[];
}

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
  const headers: (keyof FlattenedUser)[] = [
    "Vorname",
    "Nachname",
    "PersonalNummer",
    "HoodieFarbe",
    "HoodieSize",
    "StickFarbe",
    "Ort",
    "email",
  ];
  async function handleExport() {
    try {
      const response = await fetch("/api/exportCSV", {
        method: "GET",
      });
      const data: DataUser = await response.json();
      const rows = data.users.flatMap(flattUsers);
      const csvContent = [
        headers.join(","),
        ...rows.map((row) => headers.map((header) => row[header]).join(",")),
      ].join("\n");
      downloadData("\uFEFF" + csvContent);
      console.log("this is", csvContent);
    } catch (err) {
      console.log("i am getting an error", err);
    }
  }

  const flattUsers = (user: User) => {
    return user.orders.map((order) => ({
      Vorname: user?.lastName ?? "",
      Nachname: user?.firstName ?? "",
      email: user?.email ?? "",
      PersonalNummer: user?.customerNumber ?? "",
      HoodieFarbe: order?.HoodieVariant?.Color?.name ?? "",
      HoodieSize: order?.HoodieVariant?.Size?.name ?? "",
      Ort: order?.location?.name ?? "",
      StickFarbe: order?.StickColor?.name ?? "",
    }));
  };

  const downloadData = (data: string) => {
    const csvData = new Blob([data], { type: "text/csv;charset=utf-8;" });
    const csvURL = URL.createObjectURL(csvData);
    const link = document.createElement("a");
    link.href = csvURL;
    link.download = "data.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
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
