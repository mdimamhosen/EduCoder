import ChangeProfilePicture from "@/components/Dashboard/Settings/ChangeProfilePicture";
import DeleteAccount from "@/components/Dashboard/Settings/DeleteAccount";
import EditProfile from "@/components/Dashboard/Settings/EditProfile";
import UpdatePassword from "@/components/Dashboard/Settings/UpdatePassword";
import React from "react";

const Page = () => {
  return (
    <>
      <h1 className="my-7 text-xl lg:text-3xl font-medium text-gray-300">
        Edit Profile
      </h1>
      {/* Change Profile Picture */}
      <ChangeProfilePicture />
      {/* Profile */}
      <EditProfile />
      {/* Password */}
      <UpdatePassword />
      {/* Delete Account */}
      <DeleteAccount />
    </>
  );
};

export default Page;
