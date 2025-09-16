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


export {
  cloudinary,
  uploadToCloudinary
}
