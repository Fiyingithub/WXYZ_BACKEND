import prisma from "../lib/prisma.js";
import { Prisma } from "../../generated/prisma/client.js";
export const userRepository = {
    async createUser(data) {
        return prisma.user.create({
            data
        });
    },
    async getUserByEmail(email) {
        return prisma.user.findUnique({
            where: {
                email,
            },
        });
    },
    async getUserByUsername(username) {
        return prisma.user.findUnique({
            where: {
                username,
            },
        });
    },
    async getUserByEmailOrUsername(email, username) {
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
    async getUserById(id) {
        return await prisma.user.findUnique({
            where: {
                id
            }
        });
    },
    async updateUser(id, data) {
        return await prisma.user.update({
            where: {
                id
            },
            data
        });
    },
    async deleteUser(id) {
        return await prisma.user.delete({
            where: {
                id
            }
        });
    }
};
//# sourceMappingURL=UserRepository.js.map