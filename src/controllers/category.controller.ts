import type { Request, Response } from "express";
import { categoryService } from "../services/category.service.ts";
import type { UserParamsId } from "../types/userTypes.ts";


export const categoryController = {
    create: async (req: Request, res: Response) => {
        try {
            const { name } = req.body;
            const category = await categoryService.create({name});


            return res.status(201).json({
                status: 201,
                error: false,
                message: "Category created successfully.",
                data: category,
            })
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: 500,
                error: true,
                message: "An error occurred while creating the category.",
            })
        }
    },

    getAll: async (req: Request, res: Response) => {
        try {
            const categories = await categoryService.getAll();

            return res.status(200).json({
                status: 200,
                error: false,
                message: "Categories fetched successfully.",
                data: categories,
            })
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: 500,
                error: true,
                message: "An error occurred while fetching categories.",
            })
        }
    },

    getById: async (req: Request<UserParamsId>, res: Response) => {
        try {
            const { id } = req.params;
            const category = await categoryService.getById(id);

            return res.status(200).json({
                status: 200,
                error: false,
                message: "Category fetched successfully.",
                data: category,
            })
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: 500,
                error: true,
                message: "An error occurred while fetching the category.",
            })
        }
    },

    update: async (req: Request<UserParamsId>, res: Response) => {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const category = await categoryService.update(id, {name});

            return res.status(200).json({
                status: 200,
                error: false,
                message: "Category updated successfully.",
                data: category,
            })
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: 500,
                error: true,
                message: "An error occurred while updating the category.",
            })
        }
    },

    delete: async (req: Request<UserParamsId>, res: Response) => {
        try {
            const { id } = req.params;
            const category = await categoryService.delete(id);

            return res.status(200).json({
                status: 200,
                error: false,
                message: "Category deleted successfully.",
                data: category,
            })
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: 500,
                error: true,
                message: "An error occurred while deleting the category.",
            })
        }
    },
}