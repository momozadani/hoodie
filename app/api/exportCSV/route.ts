import { auth } from "@/auth"; // Referring to the auth.ts we just created
import { NextResponse } from "next/server";

export const GET = auth((req) => {
  if (req.auth) {
    return Response.json({ data: "Protected data" });
  }

  return Response.json({ message: "Not authenticated" }, { status: 401 });
});
