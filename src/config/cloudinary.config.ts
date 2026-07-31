import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

const cloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
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