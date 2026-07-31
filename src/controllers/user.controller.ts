import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { userService } from "../services/user.service.ts";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.utils.ts";
import type { UserParamsId } from "../types/userTypes.ts";

dotenv.config();

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
        console.log(error);

        return res.status(500).json({
            status: 500,
            error: true,
            message: "An error occurred while creating the user.",
        });
        }
    },

    async login(req: Request, res: Response) {
        try {
            const email = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
            const password = typeof req.body?.password === "string" ? req.body.password : "";

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

            const isPasswordValid = await bcrypt.compare(password, user.password);

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

            const token = generateAccessToken(userDto);
            const refreshToken = generateRefreshToken(userDto);

            return res.status(200).json({
                status: 200,
                error: false,
                message: "Login successful.",
                data: {
                    user: userDto,
                    refreshToken,
                    accessToken: token,
                },
            });
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                status: 500,
                error: true,
                message: "An error occurred while logging in.",
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
