import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const getRequiredEnv = (name) => {
    const value = process.env[name];
    if (!value) {
        throw new Error(`${name} is missing.`);
    }
    return value;
};
const accessSecret = getRequiredEnv("JWT_ACCESS_SECRET");
const refreshSecret = getRequiredEnv("JWT_REFRESH_SECRET");
const accessSecretExpiresIn = getRequiredEnv("JWT_ACCESS_EXPIRES_IN");
const refreshSecretExpiresIn = getRequiredEnv("JWT_REFRESH_EXPIRES_IN");
export const generateAccessToken = (payload) => {
    return jwt.sign(payload, accessSecret, {
        expiresIn: accessSecretExpiresIn,
    });
};
export const generateRefreshToken = (payload) => {
    return jwt.sign(payload, refreshSecret, {
        expiresIn: refreshSecretExpiresIn,
    });
};
export const verifyAccessToken = (token) => {
    return jwt.verify(token, accessSecret);
};
export const verifyRefreshToken = (token) => {
    return jwt.verify(token, refreshSecret);
};
//# sourceMappingURL=jwt.utils.js.map