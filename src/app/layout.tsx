import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chatters: Write, Read, Share",
  description:
    "Chatters is a fullstack web app that allows writers to write, read, and share content. Think Medium but with better steeze.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
