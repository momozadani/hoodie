"use client";

import { Button } from "@nextui-org/button";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { IoCloudDownloadSharp } from "react-icons/io5";
import { User, FlattenedUser } from "@/types/user";
import { deleteUserAction } from "@/app/action";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { FaEllipsisVertical } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Link from "next/link";

type UserAndOrder = {
  orders: {
    location: {
      name: string;
    };
    StickColor: {
      name: string;
    };
    hoodieVariantSize: {
      Size: {
        name: string;
      };
    };
    HoodieVariant: {
      Color: {
        name: string;
      };
    };
  }[];
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  customerNumber: string;
};

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

export default function UsersComponent({
  columns,
  usersAndOrder,
}: {
  columns: {
    key: string;
    label: string;
  }[];
  usersAndOrder: UserAndOrder[];
}) {
  async function handleDeleteUser(id: number) {
    await deleteUserAction(id);
  }
  function handleAllUserExport(): void {
    const rows = usersAndOrder.flatMap((user) => {
      return user.orders.map((order) => {
        return {
          email: user.email,
          Vorname: user.firstName,
          Nachname: user.lastName,
          PersonalNummer: user.customerNumber,
          HoodieFarbe: order.HoodieVariant.Color.name,
          HoodieSize: order.hoodieVariantSize.Size.name,
          StickFarbe: order.StickColor.name,
          Ort: order.location.name,
        };
      });
    });
    downloadData(rows, "All-users");
  }
  const rows = usersAndOrder.map(
    ({ customerNumber, id, email, firstName, lastName }) => ({
      id,
      customerNumber,
      email,
      firstName,
      lastName,
    })
  );
  function handleExportSelectedUser(id: number) {
    const user = usersAndOrder.filter((user) => {
      user.id === id;
    });
    const rows = user.flatMap((user) => {
      return user.orders.map((order) => {
        return {
          email: user.email,
          Vorname: user.firstName,
          Nachname: user.lastName,
          PersonalNummer: user.customerNumber,
          HoodieFarbe: order.HoodieVariant.Color.name,
          HoodieSize: order.hoodieVariantSize.Size.name,
          StickFarbe: order.StickColor.name,
          Ort: order.location.name,
        };
      });
    });
    downloadData(rows, "one-user");
  }

  function downloadData(rows: FlattenedUser[], filename: string): void {
    const csvContent = [
      headers.join(","),
      ...rows.map((row) => headers.map((header) => row[header]).join(",")),
    ].join("\n");
    const csvData = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const csvURL = URL.createObjectURL(csvData);
    const link = document.createElement("a");
    link.href = csvURL;
    link.download = `${filename}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  return (
    <div className="flex flex-col w-full pt-10">
      <Button
        startContent={<IoCloudDownloadSharp />}
        className="self-end w-1/6 mb-1"
        color="success"
        onClick={handleAllUserExport}
      >
        export all orders to csv
      </Button>
      <Table
        aria-label="Example table with dynamic content"
        isStriped
        color="secondary"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.firstName + " " + item.lastName}</TableCell>
              <TableCell>{item.customerNumber}</TableCell>
              <TableCell>
                <Dropdown>
                  <DropdownTrigger>
                    <Button isIconOnly size="sm" variant="light">
                      <FaEllipsisVertical />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem textValue="View">
                      <Link
                        href={"users/" + item.id}
                        className="flex items-center justify-between"
                      >
                        View the orders
                        <FaEye />
                      </Link>
                    </DropdownItem>
                    <DropdownItem textValue="Export">
                      <div
                        className="flex items-center justify-between"
                        onClick={() => handleExportSelectedUser(item.id)}
                      >
                        Export the user & order
                        <IoCloudDownloadSharp />
                      </div>
                    </DropdownItem>
                    <DropdownItem
                      textValue="Delete User"
                      onClick={() => handleDeleteUser(item.id)}
                    >
                      <Link
                        href={"users/" + item.id}
                        className="flex items-center justify-between"
                      >
                        Delete the user
                        <MdDeleteForever />
                      </Link>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
