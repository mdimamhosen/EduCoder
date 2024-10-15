"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { RiEditBoxLine } from "react-icons/ri";
import { formattedDate } from "@/utils/dateFormatter";
import IconBtn from "@/components/common/IconBtn";
import Image from "next/image";
import axios from "axios";

// Define a type for User
interface User {
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  additionalDetails: {
    about?: string;
    gender?: string;
    contactNumber?: string;
    dateOfBirth?: string;
  };
}

const Page: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const userId = session?.user._id;

  // Set the user state type as User | null
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;
      try {
        setLoading(true); // Set loading to true before the fetch
        const result = await axios.post(`/api/user`, { userId });
        setUser(result.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); // Set loading to false after the fetch is complete
      }
    };

    fetchUserData();
  }, [userId]);

  console.log("user from my profile", user);

  // Loading indicator
  if (loading) {
    return (
      <div
        className="text-center min-h-[calc(100vh-3.5rem)] w-screen
     flex justify-center items-center text-gray-400"
      >
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="my-7 text-3xl font-medium text-gray-200">My Profile</h1>
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 justify-between rounded-md border-[1px] border-gray-600 bg-gray-800 px-12 p-8">
        <div className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:items-center gap-x-4">
          <Image
            width={78}
            height={78}
            src={
              loading || status === "loading"
                ? "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                : user?.data.image ||
                  "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
            }
            alt={`profile-${user?.firstName || "unknown"}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-gray-300">
              {user?.data.firstName + " " + user?.data.lastName}
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
        <p className={`text-gray-400 text-sm font-medium`}>
          {user?.data.additionalDetails?.about ??
            "Write Something About Yourself"}
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
                {user?.data.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-gray-300">Email</p>
              <p className="text-sm font-medium text-gray-400">{user?.email}</p>
            </div>
            <div>
              <p className="mb-2 text-sm text-gray-300">Gender</p>
              <p className="text-sm font-medium text-gray-400">
                {user?.data.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-gray-300">Last Name</p>
              <p className="text-sm font-medium text-gray-400">
                {user?.data.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-gray-300">Phone Number</p>
              <p className="text-sm font-medium text-gray-400">
                {user?.data.additionalDetails?.contactNumber ||
                  "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-gray-300">Date Of Birth</p>
              <p className="text-sm font-medium text-gray-400">
                {formattedDate(user?.data.additionalDetails?.dateOfBirth) ||
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
