"use client";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiArrowRight, FiTrash2 } from "react-icons/fi";

const DeleteAccount = ({ user }: { user: any }) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  // Handle account deletion logic here
  async function handleDeleteAccount() {
    try {
      console.log("Account Deleted Successfully");
      console.log(user.data._id);
      const userId = user.data._id;
      const response = await axios.delete(`/api/user`, { data: { userId } });
      if (response.data.success) {
        console.log("Account Deleted Successfully");

        toast.success("Account Deleted Successfully");

        await signOut({ callbackUrl: "/" });
        router.push(`/`);
        setShowModal(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("ERROR MESSAGE - ", error.message);
      } else {
        console.error("An unknown error occurred.");
      }
    }
  }

  return (
    <>
      {/* Delete Account Section */}
      <div className="my-10 flex flex-col lg:flex-row gap-x-5 rounded-md border-[1px] border-gray-600 bg-gray-800 p-8 px-12">
        <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
          <FiTrash2 className="text-3xl text-pink-200" />
        </div>
        <div className="flex flex-col space-y-2">
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-300">
            Delete Account
          </h2>
          <div className="lg:w-3/5  text-gray-400">
            <p>Would you like to delete your account?</p>
            <p>
              This account may contain Paid Courses. Deleting your account is
              permanent and will remove all associated content.
            </p>
          </div>
          <button
            type="button"
            className="w-fit cursor-pointer italic text-pink-600 "
            onClick={() => setShowModal(true)}
          >
            I want to delete my account. <FiArrowRight className="inline" />
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div
              className="w-[90%] max-w-sm p-6 rounded-lg bg-gray-800 text-gray-300 text-center animate-fadeIn"
              style={{
                animation: "slideUp 0.4s ease-in-out",
              }}
            >
              <h3 className="mb-4 text-xl font-semibold">Are you sure?</h3>
              <p className="mb-6 text-sm text-gray-400">
                This action cannot be undone. Deleting your account will remove
                all associated data permanently.
              </p>
              <div className="flex justify-around">
                <button
                  className="rounded bg-yellow-400 py-2 px-4 text-sm font-semibold text-black transition-all duration-300 hover:scale-95 ease-linear"
                  onClick={handleDeleteAccount}
                >
                  Delete
                </button>
                <button
                  className="rounded bg-gray-600 py-2 px-4 text-sm font-semibold hover:bg-gray-700 transition-all duration-300 hover:scale-95 ease-linear"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DeleteAccount;
