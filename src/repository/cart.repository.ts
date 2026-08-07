import prisma from "../lib/prisma.ts";
import { Prisma } from "../../generated/prisma/client.ts";


export const cartRepository = {
      createCart: async (userId: string) => {
            return prisma.cart.create({
                data: {
                  userId
                }
            });
      },


      findCartByUserId: async (userId: string) => {
            return prisma.cart.findUnique({
                where: {
                    userId
                },
                include: {
                    items: {
                        include: {
                            product: {
                                include: {
                                    images: true
                                }
                            }
                        }
                    }
                }
            });
      },

      findCartById: async (id: string) => {
            return prisma.cart.findUnique({
                where: { id },
                include: {
                    items: {
                        include: {
                            product: true
                        }
                    }
                }
            });
      },

      clearCart: async (cartId: string) => {
            return prisma.cartItem.deleteMany({
                where: {
                  cartId
                }
            });
      },

      
      createCartItem: async ( cartId: string, productId: string, quantity: number) => {
            return prisma.cartItem.create({
            data: {
                cartId,
                productId,
                quantity
            }
        });
      },
      

      findCartItem: async (cartId: string, productId: string) => {
            return prisma.cartItem.findFirst({
                where: {
                    cartId,
                    productId
                }
            });
      },

      updateCartItem: async (id: string, quantity: number) => {
            return prisma.cartItem.update({
                where: {
                    id
                },
                data: {
                    quantity
                }
            });
      },

      deleteCartItem: async (id: string) => {
            return prisma.cartItem.delete({
                where: {
                    id
                }
            });
      },
    
};