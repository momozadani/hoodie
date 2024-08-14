import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Nav from "@/components/Nav";


export const dynamic = "force-dynamic";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Shop",
  description: "Hoodies bestellen",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="white">
      <body>
        <Providers>
          <Nav />
          {children}
        </Providers>
      </body>
    </html>
  );
}
