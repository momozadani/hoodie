import UserTable from "@/components/UserTable";
import { prisma } from "@/prisma/prisma";
export default async function ShowUser({ params }: { params: { id: string } }) {
  const usersAndOrder = await prisma.user.findFirst({
    where: {
      id: parseInt(params.id),
    },
    include: {
      orders: {
        select: {
          id: true,
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
              HoodieVariant: {
                select: {
                  Color: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
              Size: {
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
  if (usersAndOrder === null) {
    throw new Error("something went wrong with getting the user data");
  }
  return (
    <div className="w-full">
      <UserTable rows={usersAndOrder} />
    </div>
  );
}
