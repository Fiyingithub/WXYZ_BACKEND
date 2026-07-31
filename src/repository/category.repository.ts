import prisma from "../lib/prisma.ts";
import { Prisma } from "../../generated/prisma/client.ts";


export const categoryRepository = {
    
    create: async (data: Prisma.CategoryCreateInput) => {
        return prisma.category.create({
            data,
        });
    },

    findAll: async () => {
        return prisma.category.findMany();
    },

    findById: async (id: string) => {
        return prisma.category.findUnique({
            where: { id },
        });
    },

    exists: async (id: string) => {
        return prisma.category.findUnique({
            where: { id },
        });
    },

    update: async (id: string, data: Prisma.CategoryUpdateInput) => {
        return prisma.category.update({
            where: { id },
            data,
        });
    },

    delete: async (id: string) => {
        return prisma.category.delete({
            where: { id },
        });
    },
}