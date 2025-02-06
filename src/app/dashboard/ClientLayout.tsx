"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Content from "@/components/dashboard/Content";
import Sidebar from "@/components/dashboard/Sidebar";
import { ToastContainer, Flip } from "react-toastify";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  weight: ["400", "700", "900", "500", "600", "800"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});
const queryClient = new QueryClient();

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex w-full h-full relative">
        <ToastContainer
          position="bottom-left"
          autoClose={2500}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick={true}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Flip}
          toastClassName={`${nunito.className} antialiased font-semibold`}
        />
        <Sidebar />
        <Content>{children}</Content>
      </div>
    </QueryClientProvider>
  );
}
