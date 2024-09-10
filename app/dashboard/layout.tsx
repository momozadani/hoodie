import { auth } from "@/auth";
import SideBar from "@/components/SideBar";
import { STATUS_CODES } from "http";
import { redirect } from "next/dist/server/api-utils";
import { permanentRedirect } from "next/navigation";
import { ADMIN } from "../lib/data";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session?.user.role !== ADMIN) {
    permanentRedirect("/");
  }
  return (
    <div className="flex h-screen">
      <SideBar />
      {children}
    </div>
  );
}
