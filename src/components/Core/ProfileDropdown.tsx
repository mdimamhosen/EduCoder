"use client";

import React, { useEffect } from "react";

import { signOut, useSession } from "next-auth/react";
import { useState, useRef } from "react";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import ConfirmationModal from "../Dashboard/ConfirmationModal";
import { RootState } from "@/redux/reducer";
import axios from "axios";
interface ModalData {
  text1: string;
  text2: string;
  btn1Text: string;
  btn2Text: string;
  btn1Handler: () => void;
  btn2Handler: () => void;
}
const ProfileDropdown = () => {
  const { user } = useSelector((state: RootState) => state.profile);
  const { data: session, status } = useSession();
  const userId = session?.user._id;
  const [userDB, setUserDB] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("userId", userId);
        const result = await axios.post(`/api/user`, { userId });
        setUserDB(result.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, router]);
  console.log(userDB);

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [confirmationModal, setConfirmationModal] = useState<ModalData | null>(
    null
  );
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
    router.push("/");
    toast.success("Logged out successfully");
    setOpen(false);
    setConfirmationModal(null);
  };

  useOnClickOutside(ref, () => setOpen(false));

  if (!user) return null;

  return (
    <div>
      <button className="relative" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-1  ">
          <div className=" hover:scale-95 hover:border  transition-all duration-300 p-[1px] ease-linear hover:border-white  rounded-full group">
            <Image
              src={
                loading || status === "loading"
                  ? "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                  : userDB?.data.image ||
                    "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
              }
              alt={`${user?.firstName}`}
              width={30}
              height={30}
              className="aspect-square hover:scale-95  rounded-full object-cover    hover:shadow-xl  transition-all duration-300 ease-linear"
            />
          </div>
          <AiOutlineCaretDown className="text-lg text-gray-100" />
        </div>
        {open && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-gray-400 overflow-hidden rounded-md border-[1px] border-gray-400 bg-gray-700"
            ref={ref}
          >
            <Link href="/dashboard/my-profile" onClick={() => setOpen(false)}>
              <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm   hover:bg-gray-600 hover:text-gray-200 text-gray-300">
                <VscDashboard className="text-lg  text-gray-300" />
                Dashboard
              </div>
            </Link>
            <div
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
              className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm   hover:bg-gray-600 hover:text-gray-200 text-gray-300"
            >
              <VscSignOut className="text-lg" />
              Logout
            </div>
          </div>
        )}
      </button>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default ProfileDropdown;
