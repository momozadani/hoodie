import { Table } from "@nextui-org/table";
import UserTable from "./UserTable";
import { prisma } from "@/prisma/prisma";

export default async function ShowUser({ params }: { params: { id: string } }) {
  const getOrdersOfUser = await prisma.order.findMany({
    where: {
      userId: parseInt(params.id),
    },
  });
  if (getOrdersOfUser.length === 0) {
    throw new Error("Failed to fetch the data");
  }
  return (
    <div>
      <UserTable row={"s"} />
    </div>
  );
}
