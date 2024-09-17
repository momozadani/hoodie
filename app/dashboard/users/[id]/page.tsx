import { Table } from "@nextui-org/table";
import UserTable from "./UserTable";
import { prisma } from "@/prisma/prisma";

export default async function ShowUser({ params }: { params: { id: string } }) {
  const getOrdersOfUser = await prisma.order.findMany({
    where: {
      userId: parseInt(params.id),
    },
    include: {
      HoodieVariant: true,
      location: true,
      StickColor: true,
    },
  });
  if (getOrdersOfUser.length === 0) {
    throw new Error("something went wrong with getting the user data");
  }
  return (
    <div className="w-full">
      <UserTable rows={getOrdersOfUser} />
    </div>
  );
}
