import type { Request, Response } from "express";
import { categoryService } from "../services/category.service.ts";
import type { Prisma } from "../../generated/prisma/client";
import type { UserParamsId } from "../types/userTypes.ts";
import { uploadSingleImage } from "../utils/uploadSingleImage.ts";


export const categoryController = {
  create: async (req: Request, res: Response) => {
    try {
      const file = (req as any).file as
        | {
            buffer: Buffer;
            originalname: string;
          }
        | undefined;

      const images: string[] = [];

      if (file?.buffer && file.originalname) {
        const url = await uploadSingleImage(file.buffer, file.originalname);
        images.push(url);
      }

      const { name } = req.body;

      const data: Prisma.CategoryCreateInput = { name };

      if (images.length) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore -- satisfy Prisma nested create shape
        data.images = { create: images.map((url) => ({ url })) };
      }
      
      const category = await categoryService.create(data);

      return res.status(201).json({
        status: 201,
        error: false,
        message: "Category created successfully.",
        data: category,
      });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        error: true,
        message: "An error occurred while creating the category.",
      });
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
      });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        error: true,
        message: "An error occurred while fetching categories.",
      });
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
      });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        error: true,
        message: "An error occurred while fetching the category.",
      });
    }
  },

  update: async (req: Request<UserParamsId>, res: Response) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const category = await categoryService.update(id, { name });

      return res.status(200).json({
        status: 200,
        error: false,
        message: "Category updated successfully.",
        data: category,
      });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        error: true,
        message: "An error occurred while updating the category.",
      });
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
      });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        error: true,
        message: "An error occurred while deleting the category.",
      });
    }
  },
};
