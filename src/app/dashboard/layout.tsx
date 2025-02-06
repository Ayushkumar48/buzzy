import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "../globals.css";
import ClientLayout from "./ClientLayout";

const nunito = Nunito({
  weight: ["400", "700", "900", "500", "600", "800"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dashboard - Buzzy",
  description: "A next-gen personal task manager.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="flex flex-col w-full h-full">
      <body
        className={`${nunito.className} antialiased [&::-webkit-scrollbar]:w-2.5 [&::-webkit-scrollbar-track]:bg-gray-200 [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-track]:rounded-lg [&::-webkit-scrollbar-thumb]:rounded-md scroll-sm`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
