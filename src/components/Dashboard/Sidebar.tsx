"use client";

import { sidebarLinks } from "@/data/dashboard-links";
import React, { useState } from "react";
import { VscSignOut } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import SidebarLink from "./SidebarLink";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ConfirmationModal from "./ConfirmationModal";
import toast from "react-hot-toast";
interface ModalData {
  text1: string;
  text2: string;
  btn1Text: string;
  btn2Text: string;
  btn1Handler: () => void;
  btn2Handler: () => void;
}
const Sidebar = () => {
  const { data: session } = useSession();
  const user = session?.user;
  console.log(user);
  const router = useRouter();
  const [confirmationModal, setConfirmationModal] = useState<ModalData | null>(
    null
  );
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
    router.push("/");
    toast.success("Logged out successfully");
  };
  return (
    <div>
      <>
        <div className="flex justify-between   h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-gray-600 bg-slate-800 py-10 px-3 ">
          <div className="flex flex-col   ">
            {sidebarLinks.map((link) => {
              if (link.type && user?.accountType !== link.type) return null;
              return (
                <SidebarLink key={link.id} link={link} iconName={link.icon} />
              );
            })}
          </div>
          <div className="flex flex-col  ">
            {" "}
            <div className="mx-auto mt-6   h-[.2px]  w-[90%] bg-gray-500 border border-gray-400" />
            <SidebarLink
              link={{ name: "Settings", path: "/dashboard/settings" }}
              iconName="VscSettingsGear"
            />
            <button
              onClick={() =>
                setConfirmationModal({
                  text1: "Are you sure?",
                  text2: "You will be logged out of your account.",
                  btn1Text: "Logout",
                  btn2Text: "Cancel",
                  btn1Handler: () => {
                    handleLogout();
                    setConfirmationModal(null);
                  },
                  btn2Handler: () => {
                    setConfirmationModal(null);
                  },
                })
              }
              className="px-8 py-2 text-sm font-medium text-gray-600"
            >
              <div className="flex items-center gap-x-2 text-gray-300">
                <VscSignOut className="text-lg" />
                <span>Logout</span>
              </div>
            </button>
          </div>
        </div>
        {confirmationModal && (
          <ConfirmationModal modalData={confirmationModal} />
        )}
      </>
    </div>
  );
};

export default Sidebar;
