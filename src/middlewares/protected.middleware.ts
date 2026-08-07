import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import ENV from "../config/env.config.ts";
import logger from "../logger.ts";




export const protectedAction = ( req: Request,res: Response,next: NextFunction ) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({
        status: false,
        message: "Unauthorized",
        data: [],
        });
    }

    const token = authorization.split(" ")[1];

    if (!token) {
        return res.status(401).json({
        status: false,
        message: "Unauthorized",
        data: [],
        });
    }

    try {
        const secret = ENV.jwt.accessSecret;

        if (!secret) {
            return res.status(500).json({
                status: false,
                message: "JWT secret is not configured",
                data: [],
            });
        }

        const decoded = jwt.verify(token, secret) as JwtPayload & {
            id?: string;
            role?: string;
            username: string;
            email: string;
        };

        req.user = decoded;

        next();
    } catch (error) {
        logger.error(error);
        return res.status(401).json({
        status: false,
        message: "Unauthorized",
        data: [],
        });
    }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized",
        data: [],
      });
    }

    if (!roles.includes(req.user.role as string)) {
      return res.status(403).json({
        status: false,
        message: `Role ${req.user.role} is not authorized to access this route`,
      });
    }

    next();
  };
};
