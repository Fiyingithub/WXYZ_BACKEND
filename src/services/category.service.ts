import type { Prisma } from "../../generated/prisma/client";
import { categoryRepository } from "../repository/category.repository.ts";



export const categoryService = {

    create: async (data: Prisma.CategoryCreateInput) => {
        return categoryRepository.create(data);
    },

    getAll: async () => {
        return categoryRepository.findAll();
    },

    getById: async (id: string) => {
        return categoryRepository.findById(id);
    },

    checkExistingCategory: async (id: string) => {
        return categoryRepository.exists(id);
    },

    update: async (id: string, data: Prisma.CategoryUpdateInput) => {
        return categoryRepository.update(id, data);
    },

    delete: async (id: string) => {
        return categoryRepository.delete(id);
    },
}