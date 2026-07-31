import type { SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const getRequiredEnv = (name: string): string => {
    const value = process.env[name];

    if (!value) {
        throw new Error(`${name} is missing.`);
    }

    return value;
};

const accessSecret = getRequiredEnv("JWT_ACCESS_SECRET");
const refreshSecret = getRequiredEnv("JWT_REFRESH_SECRET");
const accessSecretExpiresIn = getRequiredEnv("JWT_ACCESS_EXPIRES_IN") as NonNullable<SignOptions["expiresIn"]>;
const refreshSecretExpiresIn = getRequiredEnv("JWT_REFRESH_EXPIRES_IN") as NonNullable<SignOptions["expiresIn"]>;

export interface JwtPayload {
    id: string;
    email: string;
    username: string;
    role: string;
}

export const generateAccessToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, accessSecret, {
        expiresIn: accessSecretExpiresIn,
    });
};

export const generateRefreshToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, refreshSecret, {
        expiresIn: refreshSecretExpiresIn,
    });
};

export const verifyAccessToken = (token: string): JwtPayload => {
    return jwt.verify(token, accessSecret) as JwtPayload;
};

export const verifyRefreshToken = (token: string): JwtPayload => {
    return jwt.verify(token, refreshSecret) as JwtPayload;
};