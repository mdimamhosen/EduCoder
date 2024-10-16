import React, { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { useSelector } from "react-redux";
import "video-react/dist/video-react.css";
import { Player } from "video-react";
import Image from "next/image";
import { RootState } from "@/redux/reducer";

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData,
  editData,
}: {
  name: string;
  label: string;
  register: any;
  setValue: any;
  errors: any;
  video?: boolean;
  viewData?: any;
  editData?: any;
}) {
  const { course } = useSelector((state: RootState) => state.course);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewSource, setPreviewSource] = useState<string | null>(
    viewData ? viewData : editData ? editData : null
  );
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? {
          "image/*": [".jpeg", ".jpg", ".png", ".gif", ".bmp", ".webp", ".svg"],
        }
      : {
          "video/*": [".mp4", ".mov", ".avi", ".mkv", ".wmv", ".flv", ".webm"],
        },
    onDrop,
  });

  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result as string);
    };
  };

  useEffect(() => {
    register(name, { required: true });
  }, [register]);

  useEffect(() => {
    setValue(name, selectedFile);
  }, [selectedFile, setValue]);

  return (
    <div className="flex flex-col space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5">
      <label
        className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold lable-style"
        htmlFor={name}
      >
        {label} {!viewData && <sup className="text-pink-200">*</sup>}
      </label>
      <div
        className={`${
          isDragActive ? "bg-gray-900" : "bg-gray-700"
        } flex min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[400px] transition-all duration-300 ease-linear cursor-pointer items-center justify-center rounded-md border-[2px] border-dotted border-gray-500`}
        {...getRootProps()}
      >
        <input {...getInputProps()} ref={inputRef} type="file" />
        {previewSource ? (
          <div className="flex w-full flex-col p-4 sm:p-6 md:p-8 lg:p-10">
            {!video ? (
              <Image
                width={1024}
                height={576}
                src={previewSource}
                alt="Preview"
                className="h-full w-full rounded-md object-cover"
              />
            ) : (
              <Player aspectRatio="16:9" playsInline src={previewSource} />
            )}
            {!viewData && (
              <button
                type="button"
                onClick={() => {
                  setPreviewSource(null);
                  setSelectedFile(null);
                  setValue(name, null);
                }}
                className="mt-2 sm:mt-3 md:mt-4 text-gray-500 underline"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div className="flex w-full flex-col items-center p-4 sm:p-6 md:p-8 lg:p-10">
            <div className="grid aspect-square w-10 sm:w-12 md:w-14 lg:w-16 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-xl sm:text-2xl md:text-3xl text-yellow-50" />
            </div>
            <p className="mt-2 sm:mt-3 md:mt-4 max-w-[200px] text-center text-sm sm:text-base md:text-lg lg:text-xl text-gray-300">
              Drag And Drop{" "}
              <span className="text-yellow-400 font-bold capitalize">
                {!video ? "image" : "video"}
              </span>
            </p>
            <ul className="mt-5 sm:mt-6 md:mt-8 lg:mt-10 flex list-disc justify-between space-x-6 sm:space-x-8 md:space-x-10 lg:space-x-12 text-center text-xs sm:text-sm md:text-base lg:text-lg text-gray-400">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>
      {errors[name] && (
        <span className="ml-2 text-xs sm:text-sm md:text-base tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
}
