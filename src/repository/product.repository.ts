import prisma from "../lib/prisma.ts";
import type { Prisma } from "../../generated/prisma/client.ts";

const create = async (data: Prisma.ProductCreateInput) => {
    return prisma.product.create({
        data,
        include: {
            category: true,
            images: true,
        },
    });
};

const findAll = async (search?: string, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const where = search
        ? {
              name: {
                  contains: search,
                  mode: "insensitive" as const,
              },
          }
        : {};

    const [products, total] = await Promise.all([
        prisma.product.findMany({
            where,
            skip,
            take: limit,
            include: {
                category: true,
                images: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        }),
        prisma.product.count({
            where,
        }),
    ]);

    return {
        products,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
};

const findById = async (id: string) => {
    return prisma.product.findUnique({
        where: { id },
        include: {
            category: true,
            images: true,
        },
    });
};

const update = async (id: string, data: Prisma.ProductUpdateInput) => {
    return prisma.product.update({
        where: { id },
        data,
        include: {
            images: true,
        },
    });
};

const deleteProduct = async (id: string) => {
    return prisma.product.delete({
        where: { id },
    });
};

const exists = async (id: string) => {
    return prisma.product.findUnique({
        where: { id },
    });
};

export const productRepository = {
    create,
    findAll,
    findById,
    update,
    deleteProduct,
    exists,
};
