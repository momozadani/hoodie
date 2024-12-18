import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Nav from "@/components/Nav";
import { auth } from "@/auth";
import icon from "@/public/icon.ico";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "HoodieHub",
  description: "Hoodies bestellen",
  icons: icon.src,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Nav session={session} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
