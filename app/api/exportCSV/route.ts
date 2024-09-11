import { ADMIN } from "@/app/lib/data";
import { auth } from "@/auth"; // Referring to the auth.ts we just created
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export const GET = auth(async (req) => {
  if (!req.auth) {
    redirect("/");
  }
  const session = req.auth;
  if (session.user.role !== ADMIN) {
    return NextResponse.json({ error: "not authorized" }, { status: 401 });
  }
  const data = prisma?.user.findMany();
  if (data) {
    return Response.json({ data }, { status: 200 });
  }
});
