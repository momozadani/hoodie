import { auth } from "@/auth";
import UsersComponent from "@/components/UsersComponent";
import { prisma } from "@/prisma/prisma";

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "customerNumber",
    label: "PERSONAL-NUMMER",
  },
  {
    key: "Action",
    label: "ACTION",
  },
];

export default async function UserPage() {
  const users = await prisma.user.findMany();
  return <UsersComponent columns={columns} rows={users} />;
}
