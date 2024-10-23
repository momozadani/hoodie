import { prisma } from "@/prisma/prisma";
import UserTable from "@/components/UserTable";
import { auth } from "@/auth";
import { permanentRedirect } from "next/navigation";
export default async function Status() {
  const session = await auth();

  if (!session) {
    permanentRedirect("/");
  }
  const email = session.user.email;
  if (email === null || email === undefined) {
    permanentRedirect("/");
  }
  const usersAndOrder = await prisma.user.findFirst({
    where: {
      email: email,
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
  if (usersAndOrder === null) {
    throw new Error("something went wrong with getting the user data");
  }
  return <UserTable rows={usersAndOrder} />;
}
