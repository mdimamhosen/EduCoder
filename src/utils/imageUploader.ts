import { v2 as cloudinary } from "cloudinary";

// Function to upload file to Cloudinary
export const uploadFile = async (
  file: any,
  folder: any,
  height: any,
  quality: any
) => {
  try {
    // Check if file and tempFilePath exist
    if (!file || !file.tempFilePath) {
      throw new Error("File is not provided or missing tempFilePath");
    }

    // Prepare upload options
    const options: any = { folder, resource_type: "auto" };
    if (height) options.height = height;
    if (quality) options.quality = quality;

    // Upload file to Cloudinary
    const res = await cloudinary.uploader.upload(file.tempFilePath, options);
    return res;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Cloudinary upload error:", error.message);
    } else {
      console.error("Cloudinary upload error:", "Unknown error occurred");
    }
    throw error;
  }
};
