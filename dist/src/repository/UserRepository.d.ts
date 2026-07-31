import { Prisma } from "../../generated/prisma/client.ts";
export declare const userRepository: {
    createUser(data: Prisma.UserCreateInput): Promise<{
        password: string;
        id: string;
        email: string;
        username: string;
        name: string | null;
        role: string;
    }>;
    getUserByEmail(email: string): Promise<{
        password: string;
        id: string;
        email: string;
        username: string;
        name: string | null;
        role: string;
    } | null>;
    getUserByUsername(username: string): Promise<{
        password: string;
        id: string;
        email: string;
        username: string;
        name: string | null;
        role: string;
    } | null>;
    getUserByEmailOrUsername(email: string, username: string): Promise<{
        password: string;
        id: string;
        email: string;
        username: string;
        name: string | null;
        role: string;
    } | null>;
    getAll(): Promise<{
        id: string;
        email: string;
        username: string;
        name: string | null;
        role: string;
    }[]>;
    getUserById(id: string): Promise<{
        password: string;
        id: string;
        email: string;
        username: string;
        name: string | null;
        role: string;
    } | null>;
    updateUser(id: string, data: Prisma.UserUpdateInput): Promise<{
        password: string;
        id: string;
        email: string;
        username: string;
        name: string | null;
        role: string;
    }>;
    deleteUser(id: string): Promise<{
        password: string;
        id: string;
        email: string;
        username: string;
        name: string | null;
        role: string;
    }>;
};
//# sourceMappingURL=UserRepository.d.ts.map