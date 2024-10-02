import { auth } from "@/auth";
import SideBar from "@/components/SideBar";
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
    <div className="flex gap-2 h-[calc(100vh-64.8px)]">
      <SideBar />
      {children}
    </div>
  );
}
