import { ADMIN } from "@/app/lib/data";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { NextRequest } from "next/server";
import { prisma } from "@/prisma/prisma";

export const GET = auth(async function GET(
  req: NextRequest & { auth: Session | null },
  { params }
) {
  const session = req.auth;
  if (!session) {
    return Response.json("unauthorized", { status: 401 });
  }
  if (session.user.role !== ADMIN) {
    return Response.json("not an Admin", { status: 401 });
  }
  if (params) {
    const id = parseInt(params["id"] as string);
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        firstName: true,
        lastName: true,
        customerNumber: true,
        email: true,
        orders: {
          select: {
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
            HoodieVariant: {
              select: {
                Color: {
                  select: {
                    name: true,
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
    return Response.json({ user }, { status: 200 });
  }
});
