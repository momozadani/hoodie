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
  const usersAndOrder = await prisma.user.findMany({
    include: {
      orders: {
        select: {
          StickColor: {
            select: {
              name: true,
            },
          },
          location: {
            select: {
              name: true,
            },
          },
          hoodieVariantSize: {
            select: {
              Size: {
                select: {
                  name: true,
                },
              },
            },
          },
          HoodieVariant: {
            select: {
              Color: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return <UsersComponent columns={columns} usersAndOrder={usersAndOrder} />;
}
