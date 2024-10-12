import cloudinary from "@/lib/cloudinary";
import { UploadApiResponse } from "cloudinary";

export interface CloudinaryUploadResponse extends UploadApiResponse {}

export const UploadFile = async (
  file: File,
  folder: string
): Promise<CloudinaryUploadResponse> => {
  const buffer = await file.arrayBuffer();
  const bytes = Buffer.from(buffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          folder: folder,
        },
        (error, result) => {
          if (error) {
            reject(new Error(error.message));
          } else if (result) {
            resolve(result as CloudinaryUploadResponse);
          } else {
            reject(new Error("Upload result is undefined"));
          }
        }
      )
      .end(bytes);
  });
};
