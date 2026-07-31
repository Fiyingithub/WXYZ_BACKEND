import { userRepository } from "../repository/UserRepository.js";
export const userService = {
    async createUser(data) {
        return await userRepository.createUser(data);
    },
    async findUserByEmail(email) {
        return await userRepository.getUserByEmail(email);
    },
    async findUserByUsername(username) {
        return await userRepository.getUserByUsername(username);
    },
    async findUserByEmailOrUsername(email, username) {
        return await userRepository.getUserByEmailOrUsername(email, username);
    },
    async getAll() {
        return await userRepository.getAll();
    },
    async getUserById(id) {
        return await userRepository.getUserById(id);
    },
    async updateUser(id, data) {
        return await userRepository.updateUser(id, data);
    },
    async deleteUser(id) {
        return await userRepository.deleteUser(id);
    },
};
//# sourceMappingURL=user.service.js.map