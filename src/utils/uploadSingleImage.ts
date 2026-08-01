import cloudinary from "../config/cloudinary.config.ts";

// comsole success message

export const uploadSingleImage = async (
    buffer: Buffer,
    originalname: string
): Promise<string> => {

    return new Promise((resolve, reject) => {

      const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "wxyz",
                resource_type: "image",

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
                        new Error("Image upload failed")
                    );
                }

                resolve(result.secure_url);
            }
        );


        uploadStream.end(buffer);
    });
};