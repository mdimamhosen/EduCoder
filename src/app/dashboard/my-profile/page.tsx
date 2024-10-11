"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { RiEditBoxLine } from "react-icons/ri";
import React from "react";
import { formattedDate } from "@/utils/dateFormatter";
import IconBtn from "@/components/common/IconBtn";
import Image from "next/image";
const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const user = session?.user;
  return (
    <>
      <h1 className="my-7 text-3xl font-medium text-gray-200">My Profile</h1>
      <div className="flex  flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 justify-between rounded-md border-[1px] border-gray-600 bg-gray-800 px-12  p-8  ">
        <div className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:items-center gap-x-4">
          <Image
            width={78}
            height={78}
            src={user?.image}
            alt={`profile-${user?.firstName || "unknown"}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-gray-300">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-gray-400">{user?.email}</p>
          </div>
        </div>
        <IconBtn
          text="Edit"
          onclick={() => {
            router.push("/dashboard/settings");
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-gray-600 bg-gray-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-gray-300">About</p>
          <IconBtn
            text="Edit"
            onclick={() => {
              router.push("/dashboard/settings");
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          className={`${
            user?.additionalDetails?.about ? "text-gray-400" : "text-gray-400"
          } text-sm font-medium`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-gray-600 bg-gray-800 p-8 px-12">
        <div className="flex gap-3 w-full items-center justify-between">
          <p className=" text-lg font-semibold text-gray-300">
            Personal Details
          </p>
          <IconBtn
            text="Edit"
            onclick={() => {
              router.push("/dashboard/settings");
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className="flex flex-col md:flex-row max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-gray-300">First Name</p>
              <p className="text-sm font-medium text-gray-400">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-gray-300">Email</p>
              <p className="text-sm font-medium text-gray-400">{user?.email}</p>
            </div>
            <div>
              <p className="mb-2 text-sm text-gray-300">Gender</p>
              <p className="text-sm font-medium text-gray-400">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-gray-300">Last Name</p>
              <p className="text-sm font-medium text-gray-400">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-gray-300">Phone Number</p>
              <p className="text-sm font-medium text-gray-400">
                {user?.additionalDetails?.contactNumber || "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-gray-300">Date Of Birth</p>
              <p className="text-sm font-medium text-gray-400">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ||
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
