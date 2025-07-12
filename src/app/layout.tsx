import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Staff Canvas",
  description: "An employee directory application.",
  icons: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'/>",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="font-sans antialiased h-full bg-background">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
