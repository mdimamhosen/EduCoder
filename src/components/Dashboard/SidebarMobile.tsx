"use client";
import { signOut } from "next-auth/react";
import { sidebarLinks } from "@/data/dashboard-links";
import React, { useEffect, useState } from "react";
import { VscSignOut, VscThreeBars, VscChromeClose } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import SidebarLink from "./SidebarLink";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ConfirmationModal from "./ConfirmationModal";
import toast from "react-hot-toast";
import { RootState } from "@/redux/reducer";

interface ModalData {
  text1: string;
  text2: string;
  btn1Text: string;
  btn2Text: string;
  btn1Handler: () => void;
  btn2Handler: () => void;
}

const SidebarMobile = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const { isNavOpen } = useSelector((state: RootState) => state.profile);
  console.log("isNavOpen in sidebarMobile", isNavOpen);

  const router = useRouter();
  const [confirmationModal, setConfirmationModal] = useState<ModalData | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isNavOpen) {
      setIsOpen(false);
    }
  }, [isNavOpen]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
    router.push("/");
    toast.success("Logged out successfully");
    setIsOpen(false);
    setConfirmationModal(null);
  };

  return (
    <>
      <button
        className="md:hidden text-gray-400 w-fit px-4 py-1"
        onClick={() => setIsOpen(true)}
      >
        <VscThreeBars className="text-2xl" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 top-[3.5rem] z-50 flex flex-col h-[calc(100vh-3.5rem)] w-64 bg-slate-800 border-r-[1px] border-gray-600 py-5 px-3 shadow-lg transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-300 hover:text-gray-200 transition-all duration-300 ease-linear"
          >
            <VscChromeClose className="text-2xl" />
          </button>
        </div>
        <div className="flex flex-col flex-grow mt-4 space-y-2">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null;
            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            );
          })}
        </div>
        <div className="flex flex-col mt-4">
          <div className="mx-auto mt-2 h-[0.5px] w-[90%] bg-gray-500" />
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
                btn1Handler: handleLogout,
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="flex items-center px-8 py-2 mt-2 text-sm font-medium text-gray-600 hover:bg-gray-700 hover:text-white rounded transition-colors duration-200"
          >
            <div className="flex items-center gap-x-2 text-gray-300">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default SidebarMobile;
