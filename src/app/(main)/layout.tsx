import type { Metadata } from "next";
import { Beiruti } from "next/font/google";
import "../globals.css";
import Header from "@/components/app/Header";

const beiruti = Beiruti({
  weight: ["400", "700", "900", "500", "600", "800"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Buzzy",
  description: "A next-gen personal task manager.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="flex flex-col w-full h-full">
      <body className={`${beiruti.className} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
