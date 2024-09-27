import { v2 as cloudinary } from "cloudinary";

export const cloudinaryConnect = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
    console.log("Connected to Cloudinary");
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error connecting to Cloudinary", error.message);
    } else {
      console.log("Unknown error connecting to Cloudinary");
    }
    process.exit(1);
  }
};
