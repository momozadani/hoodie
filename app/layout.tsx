import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Nav from "@/components/Nav";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "HoodieHub",
  description: "Hoodies bestellen",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html
      lang="en"
      className="text-black bg-white dark dark:bg-gray-800 dark:text-white"
    >
      <body>
        <Providers>
          <Nav session={session} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
