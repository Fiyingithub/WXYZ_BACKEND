import prisma from "../lib/prisma.ts";
import { Prisma } from "../../generated/prisma/client.ts";

export const userRepository = {
    async createUser(data: Prisma.UserCreateInput) {
        return prisma.user.create({
            data
        });
    },

    async getUserByEmail(email: string) {
        return prisma.user.findUnique({
            where: {
                email,
            },
        });
    },

    async getUserByUsername(username: string) {
        return prisma.user.findUnique({
            where: {
                username,
            },
        });
    },


    async  getUserByEmailOrUsername(email: string, username: string) {
        return prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { username }
                ]
            }
        });
    },
    

    async getAll() {
        return await prisma.user.findMany({
            omit: {
                password: true
            }
        });
    },

    async getUserById(id: string) {
        return await prisma.user.findUnique({
            where: {
                id
            }
        });
    },

    async updateUser(id: string, data: Prisma.UserUpdateInput) {
        return await prisma.user.update({
            where: {
                id
            },
            data
        });
    },

    async deleteUser(id: string) {
        return await prisma.user.delete({
            where: {
                id
            }
        });
    }
};