import type { Prisma } from "../../generated/prisma/client";
export declare const userService: {
    createUser(data: Prisma.UserCreateInput): Promise<{
        password: string;
        id: string;
        email: string;
        username: string;
        name: string | null;
        role: string;
    }>;
    findUserByEmail(email: string): Promise<{
        password: string;
        id: string;
        email: string;
        username: string;
        name: string | null;
        role: string;
    } | null>;
    findUserByUsername(username: string): Promise<{
        password: string;
        id: string;
        email: string;
        username: string;
        name: string | null;
        role: string;
    } | null>;
    findUserByEmailOrUsername(email: string, username: string): Promise<{
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
//# sourceMappingURL=user.service.d.ts.map