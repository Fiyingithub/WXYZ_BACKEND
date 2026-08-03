import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import ENV from "./env.config.ts";

dotenv.config();

const cloudinaryConfig = {
    cloud_name: ENV.cloudinary.cloudName,
    api_key: ENV.cloudinary.apiKey,
    api_secret: ENV.cloudinary.apiSecret,
    secure: true,
};


// Validate required environment variables
if ( !cloudinaryConfig.cloud_name || !cloudinaryConfig.api_key || !cloudinaryConfig.api_secret ) {
    
    throw new Error(
        "Cloudinary configuration missing. Check CLOUDINARY_NAME, CLOUDINARY_KEY, and CLOUDINARY_SECRET in your .env file."
    );
}

cloudinary.config({
    cloud_name: cloudinaryConfig.cloud_name,
    api_key: cloudinaryConfig.api_key,
    api_secret: cloudinaryConfig.api_secret,
    secure: cloudinaryConfig.secure,
});

export default cloudinary;