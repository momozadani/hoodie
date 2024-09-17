import { auth } from "@/auth";
import UsersComponent from "@/components/UsersComponent";
import { prisma } from "@/prisma/prisma";
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
