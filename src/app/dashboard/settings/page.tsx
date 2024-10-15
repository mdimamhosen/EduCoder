"use client";
import ChangeProfilePicture from "@/components/Dashboard/Settings/ChangeProfilePicture";
import DeleteAccount from "@/components/Dashboard/Settings/DeleteAccount";
import EditProfile from "@/components/Dashboard/Settings/EditProfile";
import UpdatePassword from "@/components/Dashboard/Settings/UpdatePassword";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const Page = () => {
  const { data: session } = useSession();
  const userId = session?.user._id;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;
      try {
        const formData = new FormData();
        formData.append("userId", userId);
        const result = await axios.post(`/api/user`, { userId });
        setUser(result.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <>
      <h1 className="my-7 text-xl lg:text-3xl font-medium text-gray-300">
        Edit Profile
      </h1>
      <ChangeProfilePicture user={user} />
      <EditProfile user={user} />
      <UpdatePassword user={user} />
      <DeleteAccount user={user} />
    </>
  );
};

export default Page;
