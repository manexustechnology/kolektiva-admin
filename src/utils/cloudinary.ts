import axios from "axios";
import { cloudinaryConstants } from "@/constants/cloudinary.constant";

export const uploadFileToCloudinary = async (
  item: File | string,
  folder: string
) => {
  try {
    const formData = new FormData();
    console.log("cloudinaryConstants", cloudinaryConstants);

    formData.append("file", item);
    formData.append("upload_preset", cloudinaryConstants.uploadPreset);
    formData.append("folder", `${cloudinaryConstants.folderName}/${folder}`);

    const response = await axios.post(cloudinaryConstants.url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.secure_url;
  } catch (error) {
    console.error("Cloudinary Signed Upload Error:", error);
    throw error;
  }
};
