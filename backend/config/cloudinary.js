// config/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import  streamifier from 'streamifier'

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


async function uploadToCloudinary(fileBuffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'my_app_images' },
      (error, result) => (error ? reject(error) : resolve(result))
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
}


const extractPublicId = (secureUrl) => {
  const parts = secureUrl.split("/");
  const uploadIndex = parts.indexOf("upload");
  const afterUpload = parts.slice(uploadIndex + 1);
  const withoutVersion = afterUpload.filter((segment) => !/^v\d+$/.test(segment));
  const publicIdWithExt = withoutVersion.join("/");
  return publicIdWithExt.substring(0, publicIdWithExt.lastIndexOf("."));
};

export const deleteImageFromCloudinary = async (secure_url) => {
  try {
    const publicId = extractPublicId(secure_url);
    if (!publicId) throw new Error("Invalid secure_url");

    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result === "ok") {
      console.log(`✅ Image deleted successfully: ${publicId}`);
    } else {
      console.warn(`⚠️ Could not delete image or not found: ${publicId}`);
    }

    return result;
  } catch (error) {
    console.error("❌ Error deleting image:", error.message);
    throw error;
  }
};

export {
  cloudinary,
  uploadToCloudinary
}
