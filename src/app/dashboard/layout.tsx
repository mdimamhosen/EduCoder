"use client";
import Sidebar from "@/components/Dashboard/Sidebar";
import SidebarMobile from "@/components/Dashboard/SidebarMobile";
import { useSession } from "next-auth/react";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();
  if (status === "loading") {
    return (
      <div className="flex min-h-[calc(100vh-3.5rem)] bg-slate-900 items-center justify-center text-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      <div className=" bg-gray-900 md:hidden">
        <SidebarMobile />
      </div>
      <div className="h-[calc(100vh-3.5rem)] -ml-5 flex-1 overflow-auto bg-slate-900 text-white  ">
        <div className="mx-auto w-11/12 max-w-[1000px]">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
