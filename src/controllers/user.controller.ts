import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { userService } from "../services/user.service.ts";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt.utils.ts";
import type { UserParamsId } from "../types/userTypes.ts";
import logger from "../logger.ts";


export const userController = {
    async createUser(req: Request, res: Response) {
        try {
            const { email, username, password, role } = req.body;

            const existingUser = await userService.findUserByEmailOrUsername(
                email,
                username,
            );

            if (existingUser) {
                if (existingUser.email === email) {
                    return res.status(400).json({
                        status: 400,
                        error: true,
                        message: "Email already exists.",
                    });
                }

                if (existingUser.username === username) {
                    return res.status(400).json({
                        status: 400,
                        error: true,
                        message: "Username already exists.",
                    });
                }
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            // const lowerCaseRole = role.toLowerCase();

            const user = await userService.createUser({
                email,
                username,
                password: hashedPassword,
                role
            });

            return res.status(201).json({
                status: 201,
                error: false,
                message: "User created successfully.",
                data: user,
            });
        } catch (error) {
        logger.error(error);

        return res.status(500).json({
            status: 500,
            error: true,
            message: "An error occurred while creating the user.",
        });
        }
    },

    async login(req: Request, res: Response) {
        try {
            const email =
                typeof req.body?.email === "string"
                    ? req.body.email.trim().toLowerCase()
                    : "";

            const password =
                typeof req.body?.password === "string"
                    ? req.body.password
                    : "";


            if (!email || !password) {
                return res.status(400).json({
                    status: 400,
                    error: true,
                    message: "Email and password are required.",
                });
            }


            const user = await userService.findUserByEmail(email);


            if (!user) {
                return res.status(401).json({
                    status: 401,
                    error: true,
                    message: "Invalid email or password.",
                });
            }


            const isPasswordValid = await bcrypt.compare(
                password,
                user.password
            );


            if (!isPasswordValid) {
                return res.status(401).json({
                    status: 401,
                    error: true,
                    message: "Invalid email or password.",
                });
            }



            const userDto = {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role,
                name: user.name,
            };



            const accessToken = generateAccessToken(userDto);

            const refreshToken = generateRefreshToken(userDto);



            // Store refresh token in HTTP-only cookie
            res.cookie(
                "refreshToken",
                refreshToken,
                {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                }
            );



            return res.status(200).json({
                status: 200,
                error: false,
                message: "Login successful.",
                data: {
                    user: userDto,
                    accessToken,
                },
            });


        } catch (error) {

            logger.error(error);

            return res.status(500).json({
                status: 500,
                error: true,
                message: "An error occurred while logging in.",
            });
        }
    },

    async refreshToken(req: Request, res: Response) {

        try {

            const token = req.cookies.refreshToken;


            if (!token) {
                return res.status(401).json({
                    status:401,
                    error:true,
                    message:"Refresh token missing."
                });
            }



            const decoded = verifyRefreshToken(token);



            const newAccessToken =
                generateAccessToken({
                    id: decoded.id,
                    email: decoded.email,
                    username: decoded.username,
                    role: decoded.role
                });



            return res.status(200).json({
                status:200,
                error:false,
                message:"Access token refreshed.",
                data:{
                    accessToken:newAccessToken
                }
            });



        } catch(error){

            logger.error(error);


            return res.status(403).json({
                status:403,
                error:true,
                message:"Invalid or expired refresh token."
            });
        }
    },
            
    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await userService.getAll();

            return res.status(200).json({
                status: 200,
                error: false,
                message: "Users fetched successfully.",
                data: users,
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                error: true,
                message: "An error occurred while fetching users.",
            });
        }
    },

    async getUserById(req: Request<UserParamsId>, res: Response) {
        try {
            const { id } = req.params;

            const user = await userService.getUserById(id);

            if (!user) {
                return res.status(404).json({
                    status: 404,
                    error: true,
                    message: "User not found.",
                });
            }

            const userDto = {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role,
                name: user.name
            };

            return res.status(200).json({
                status: 200,
                error: false,
                message: "User fetched successfully.",
                user: userDto,
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                error: true,
                message: "An error occurred while fetching the user.",
            });
        }
    },

    async updateUser(req: Request<UserParamsId>, res: Response) {
        try {
            const { id } = req.params;

            const user = await userService.updateUser(id, req.body);

            if (!user) {
                return res.status(404).json({
                    status: 404,
                    error: true,
                    message: "User not found.",
                });
            }

            const userDto = {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role,
                name: user.name
            };

            return res.status(200).json({
                status: 200,
                error: false,
                message: "User updated successfully.",
                user: userDto,
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                error: true,
                message: "An error occurred while updating the user.",
            });
        }
    },

    async deleteUser(req: Request<UserParamsId>, res: Response) {
        try {
            const { id } = req.params;

            const user = await userService.deleteUser(id);

            if (!user) {
                return res.status(404).json({
                    status: 404,
                    error: true,
                    message: "User not found.",
                });
            }

            return res.status(200).json({
                status: 200,
                error: false,
                message: "User deleted successfully.",
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                error: true,
                message: "An error occurred while deleting the user.",
            });
        }
    },
};
