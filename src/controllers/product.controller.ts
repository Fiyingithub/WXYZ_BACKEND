import type { Request, Response } from "express";
import { productService } from "../services/product.service.ts";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.ts";
import type { UserParamsId } from "../types/userTypes.ts";

export const productController = {
  async createProduct(req: Request, res: Response) {
    try {
      const files = ((req as any).files || []) as Array<{
        buffer: Buffer;
        originalname: string;
      }>;

      const imageUrls: string[] = [];

      for (const file of files) {
        if (file?.buffer && file.originalname) {
          const url = await uploadToCloudinary(file.buffer, file.originalname);
          imageUrls.push(url);
        }
      }

      const product = await productService.createProduct(req.body, imageUrls);

      return res.status(201).json({
        status: 201,
        error: false,
        message: "Product created successfully.",
        data: product,
      });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        error: true,
        message: "An error occurred while creating the product.",
      });
    }
  },

  async getProducts(req: Request, res: Response) {
    try {
      const { search, page = "1", limit = "10" } = req.query;

      const products = await productService.getProducts(
        search as string,
        Number(page),
        Number(limit),
      );

      return res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: "An error occurred while fetching products.",
      });
    }
  },

  async getProductById(req: Request<UserParamsId>, res: Response) {
    try {
      const { id } = req.params;

      const product = await productService.getProduct(id);

      return res.status(200).json({
        status: 200,
        error: false,
        message: "Product fetched successfully.",
        data: product,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        error: true,
        message: "An error occurred while fetching the product.",
      });
    }
  },

  async updateProduct(req: Request<UserParamsId>, res: Response) {
    try {
      const { id } = req.params;

      const product = await productService.updateProduct(id, req.body);
      

      return res.status(200).json({
        status: 200,
        error: false,
        message: "Product updated successfully.",
        data: product,
      });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        error: true,
        message: "An error occurred while updating the product.",
      });
    }
  },

  async deleteProduct(req: Request<UserParamsId>, res: Response) {
    try {
      const { id } = req.params;

      const product = await productService.deleteProduct(id);

      return res.status(200).json({
        status: 200,
        error: false,
        message: "Product deleted successfully.",
        data: product,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        error: true,
        message: "An error occurred while deleting the product.",
      });
    }
  },
};
