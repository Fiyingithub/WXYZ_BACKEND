import type { Request, Response } from "express";
import { cartService } from "../services/cart.service.ts";
import logger from "../logger.ts";


export const cartController = {

      addToCart: async (req: Request, res: Response) => {
            try {
                  const userId = req.user?.id;
                  if(!userId){
                        return res.status(401).json({
                              status: 401,
                              error: true,
                              message: "Unathorized"
                        })
                  }

                  const { productId, quantity } = req.body;

                  const item = await cartService.addToCart(
                        userId,
                        productId,
                        quantity
                  );

                  return res.status(200).json({
                        status: 200,
                        error: false,
                        message: "Item added to cart",
                        data: item
                  });
            } catch (error) {
                  logger.info(error);
                  return res.status(500).json({
                        status: 500,
                        error: true,
                        message: "An error occurred while adding to cart",
                  })
            }
      },

      getCartByUserId: async (req: Request, res: Response) => {
            try {
                  const userId = req.user?.id;
                  if(!userId){
                        return res.status(401).json({
                              status: 401,
                              error: true,
                              message: "Unathorized"
                        })
                  }

                  const cart = await cartService.getUserCart(userId);

                  return res.status(200).json({
                        status: 200,
                        error: false,
                        message: "Cart fetched successfully",
                        data: cart
                  });
            } catch (error) {
                  logger.info(error);
                  return res.status(500).json({
                        status: 500,
                        error: true,
                        message: "An error occurred while fetching the cart",
                  })
            }
      },

      updateQuantity: async (req: Request, res: Response) => {
            try {
                  const userId = req.user?.id;
                  if(!userId){
                        return res.status(401).json({
                              status: 401,
                              error: true,
                              message: "Unathorized"
                        })
                  }

                  const { productId, quantity } = req.body;

                  const item = await cartService.updateQuantity(
                        userId,
                        productId,
                        quantity
                  );

                  return res.status(200).json({
                        status: 200,
                        error: false,
                        message: "Cart updated",
                        data: item
                  });
            } catch (error) {
                  logger.info(error);
                  return res.status(500).json({
                        status: 500,
                        error: true,
                        message: "An error occurred while updating the quantity",
                  })
            }
      },

      removeItem: async (req: Request, res: Response) => {
            try {
                  const userId = req.user?.id;
                  if(!userId){
                        return res.status(401).json({
                              status: 401,
                              error: true,
                              message: "Unathorized"
                        })
                  }

                  const { productId } = req.params as { productId: string };

                  if (!productId) {
                        return res.status(400).json({
                              status: 400,
                              error: true,
                              message: "Product ID is required",
                        });
                  }

                  await cartService.removeFromCart(
                        userId,
                        productId
                  );

                  return res.status(200).json({
                        status: 200,
                        error: false,
                        message: "Item removed from cart",
                  });
            } catch (error) {
                  logger.info(error);
                  return res.status(500).json({
                        status: 500,
                        error: true,
                        message: "An error occurred while removing the item from the cart",
                  })
            }
      },

      clearCart: async (req: Request, res: Response) => {
            try {
                  const userId = req.user?.id;
                  if(!userId){
                        return res.status(401).json({
                              status: 401,
                              error: true,
                              message: "Unathorized"
                        })
                  }

                  await cartService.clearCart(userId);

                  return res.status(200).json({
                        status: 200,
                        error: false,
                        message: "Cart cleared",
                  });
            } catch (error) {
                  logger.info(error);
                  return res.status(500).json({
                        status: 500,
                        error: true,
                        message: "An error occurred while clearing the cart",
                  })
            }
      }

}