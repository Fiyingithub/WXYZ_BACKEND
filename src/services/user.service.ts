import type { Prisma } from "../../generated/prisma/client";
import { userRepository } from "../repository/UserRepository.ts";


export const userService = {

    async createUser(data: Prisma.UserCreateInput) {
        return await userRepository.createUser(data);
    }, 

    async findUserByEmail(email: string) {
        return await userRepository.getUserByEmail(email);
    },

    async findUserByUsername(username: string) {
        return await userRepository.getUserByUsername(username);
    },

    async findUserByEmailOrUsername(email: string, username: string) {
        return await userRepository.getUserByEmailOrUsername(email, username);  
    },

    async getAll() {
        return await userRepository.getAll();
    },

    async getUserById(id: string) {
        return await userRepository.getUserById(id);
    },

    async updateUser(id: string, data: Prisma.UserUpdateInput) {
        return await userRepository.updateUser(id, data);
    },

    async deleteUser(id: string) {
        return await userRepository.deleteUser(id);
    },



};