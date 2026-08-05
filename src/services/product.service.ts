import type { Prisma } from "../../generated/prisma/client.ts";
import { productRepository } from "../repository/product.repository.ts";


const createProduct = async (data: any, images:string[]) =>{

    return await productRepository.create({

        name: data.name,

        description: data.description,

        price: Number(data.price),

        quantity: Number(data.quantity),


        category: {
            connect:{
                id:data.categoryId
            }
        },


        images:{
            create: images.map((url)=>({
                url
            }))
        }

    });

}



const getProducts = async (search?: string, page = 1, limit = 10) => {
    return productRepository.findAll(search, page, limit);
};

const getProduct = async (id: string) => {
    const product = await productRepository.findById(id);

    if (!product) {
        throw new Error("Product not found");
    }

    return product;
};

const getProductByCategoryId = async (categoryId: string) => {
    return productRepository.getProductByCategoryId(categoryId);
};

const updateProduct = async (id: string, data: Prisma.ProductUpdateInput) => {
    return productRepository.update(id, data);
};

const deleteProduct = async (id: string) => {
    return productRepository.deleteProduct(id);
};

const productExists = async (id: string) => {
    return productRepository.exists(id);
};

export const productService = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    productExists,
    getProductByCategoryId
};
