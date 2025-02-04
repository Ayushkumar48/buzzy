"use client";
import Content from "@/components/dashboard/Content";
import Sidebar from "@/components/dashboard/Sidebar";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-screen relative">
      <Sidebar />
      <Content>{children}</Content>
    </div>
  );
}
