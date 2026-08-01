import prisma from "../lib/prisma.ts";
import { Prisma } from "../../generated/prisma/client.ts";


export const categoryRepository = {
    
    create: async (data: Prisma.CategoryCreateInput) => {
        return prisma.category.create({
            data,
            include: {
                images: true,
            },
        });
    },

    findAll: async () => {
        return prisma.category.findMany({
            include: {
                images: true,
            },
        });
    },

    findById: async (id: string) => {
        return prisma.category.findUnique({
            where: { id },
            include: {
                images: true,
            },
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
            include: {
                images: true,
            },
        });
    },

    delete: async (id: string) => {
        const category = await prisma.category.findUnique({
            where: {
                id,
            },
            include: {
                products: true,
            },
        });


        if (!category) {
            throw new Error("Category not found");
        }


        if (category.products.length > 0) {
            throw new Error(
                "Cannot delete category because it has products"
            );
        }


        return prisma.category.delete({
            where: {
                id,
            },
        });
    },
}