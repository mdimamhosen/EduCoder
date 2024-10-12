import { useEffect, useRef, useState } from "react";
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
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
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
    <div className="flex flex-col space-y-2">
      <label className="text-sm lable-style" htmlFor={name}>
        {label} {!viewData && <sup className="text-pink-200">*</sup>}
      </label>
      <div
        className={`${
          isDragActive ? "bg-gray-900" : "bg-gray-700"
        } flex min-h-[250px] transition-all duration-300 ease-linear cursor-pointer items-center justify-center rounded-md border-[2px] border-dotted border-gray-500`}
      >
        {previewSource ? (
          <div className="flex w-full flex-col p-6">
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
                className="mt-3 text-gray-500 underline"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div
            className="flex w-full flex-col items-center p-6"
            {...getRootProps()}
          >
            <input {...getInputProps()} ref={inputRef} />
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>
            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
              Drag and drop an {!video ? "image" : "video"}, or click to{" "}
              <span className="font-semibold text-yellow-50">Browse</span> a
              file
            </p>
            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-200">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
}
