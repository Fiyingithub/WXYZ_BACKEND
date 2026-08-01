import cloudinary from "../config/cloudinary.config.ts";

export const uploadMultipleImages = async ( buffer: Buffer, originalname: string ): Promise<string> => {
    try {
        return new Promise<string>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
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
                },
                (error, result) => {
                    if (error) {
                        return reject(error);
                    }

                    if (!result?.secure_url) {
                        return reject(
                            new Error("Cloudinary upload failed: No URL returned")
                        );
                    }

                    resolve(result.secure_url);
                }
            );

            uploadStream.end(buffer);
        });
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Cloudinary upload failed: ${error.message}`);
        }

        throw new Error("Cloudinary upload failed");
    }
};