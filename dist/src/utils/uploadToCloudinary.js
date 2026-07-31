import cloudinary from "../config/cloudinary.config.js";
export const uploadToCloudinary = async (buffer, originalname) => {
    try {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream({
                resource_type: "auto",
                folder: "wxyz",
                public_id: `${Date.now()}_${originalname.split(".")[0]}`,
                transformation: [
                    {
                        width: 1200,
                        height: 1200,
                        crop: "fill",
                    },
                    {
                        quality: "auto",
                    },
                ],
            }, (error, result) => {
                if (error) {
                    return reject(error);
                }
                if (!result?.secure_url) {
                    return reject(new Error("Cloudinary upload failed: No URL returned"));
                }
                resolve(result.secure_url);
            });
            uploadStream.end(buffer);
        });
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Cloudinary upload failed: ${error.message}`);
        }
        throw new Error("Cloudinary upload failed");
    }
};
//# sourceMappingURL=uploadToCloudinary.js.map