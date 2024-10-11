"use client";
import { useEffect, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import Image from "next/image";

import { useSession } from "next-auth/react";
import IconBtn from "@/components/common/IconBtn";

export default function ChangeProfilePicture() {
  const { data: session } = useSession();
  const user = session?.user;
  const [loading, setLoading] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewSource, setPreviewSource] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  // File preview logic
  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result as string);
    };
  };

  // Handle file upload logic
  //(you'll need to implement the upload logic, such as using Cloudinary or a custom backend)
  const handleFileUpload = async () => {
    if (!imageFile) return;

    setLoading(true);
    try {
      // Add your file upload logic here
      console.log("Uploading file:", imageFile);

      // Simulate file upload delay (replace this with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("File uploaded successfully!");
    } catch (error) {
      console.error("File upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-x-4 rounded-md border-[1px] border-gray-600 bg-gray-800 p-6 md:p-8 px-4 md:px-12">
      <div className="flex flex-col md:flex-row items-center gap-4 w-full">
        <Image
          width={78}
          height={78}
          src={previewSource || user?.image || ""}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[78px] rounded-full object-cover"
        />
        <div className="space-y-2 flex-1 text-center md:text-left">
          <p className="text-gray-200 text-lg md:text-xl lg:text-2xl">
            Change Profile Picture
          </p>
          <div className="flex  flex-row justify-center md:justify-start gap-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/gif, image/jpeg"
            />
            <button
              onClick={handleClick}
              disabled={loading}
              className="cursor-pointer rounded-md bg-gray-600 border border-gray-500 py-2 px-5 font-semibold text-gray-200 hover:scale-95 transition-all duration-300"
            >
              Select
            </button>
            <IconBtn
              text={loading ? "Uploading..." : "Upload"}
              onclick={handleFileUpload}
              disabled={loading || !imageFile}
            >
              {!loading && <FiUpload className="text-lg" />}
            </IconBtn>
          </div>
        </div>
      </div>
    </div>
  );
}
