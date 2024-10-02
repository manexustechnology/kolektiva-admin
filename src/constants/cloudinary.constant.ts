export const cloudinaryConstants = {
  url: String(process.env.NEXT_PUBLIC_CLOUDINARY_URL),
  cloudName: String(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME),
  folderName: String(process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER_NAME),
  uploadPreset: String(process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET),
};
