import { user } from "@nextui-org/theme";
import { ADMIN } from "@/app/lib/data";
import { auth } from "@/auth"; // Referring to the auth.ts we just created
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";

export const GET = auth(async (req) => {
  if (!req.auth) {
    redirect("/");
  }
  const session = req.auth;
  if (session.user.role !== ADMIN) {
    return NextResponse.json({ error: "not authorized" }, { status: 401 });
  }
  const users = await prisma.user.findMany({
    select: {
      lastName: true,
      firstName: true,
      email: true,
      customerNumber: true,
      orders: {
        select: {
          HoodieVariant: {
            select: {
              Size: {
                select: {
                  name: true,
                },
              },
              Color: {
                select: {
                  name: true,
                },
              },
            },
          },
          location: {
            select: {
              name: true,
            },
          },
          StickColor: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  if (users) {
    return Response.json({ users }, { status: 200 });
  }
});
