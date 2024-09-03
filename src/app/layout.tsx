import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { interGlobalFont } from "@/commons/font";

export const metadata: Metadata = {
  title: "Kolektiva Admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={interGlobalFont.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
