import { cartRepository } from "../repository/cart.repository.ts";
import { productRepository } from "../repository/product.repository.ts";



export const cartService = {

      addToCart: async (userId: string, productId: string, quantity: number) => {

            let cart: any = await cartRepository.findCartByUserId(userId);

            if (!cart) {
                  cart = await cartRepository.createCart(userId);
            }

            const existingItem = await cartRepository.findCartItem(
                  cart.id,
                  productId
            );

            if (existingItem) {

                  return cartRepository.updateCartItem(
                        existingItem.id,
                        existingItem.quantity + quantity
                  );
            }

            return cartRepository.createCartItem(
                  cart.id,
                  productId,
                  quantity
            );
      },

      getUserCart: async (userId: string) => {

            let cart: any = await cartRepository.findCartByUserId(userId);

            if (!cart) {
                  cart = await cartRepository.createCart(userId);
                  cart = await cartRepository.findCartByUserId(userId);
            }

            return cart;
      },

      updateQuantity: async (userId: string, productId: string, quantity: number) => {
            const cart: any = await cartRepository.findCartByUserId(userId);


            if (!cart) {
                  throw new Error("Cart not found");
            }


            const existingItem = await cartRepository.findCartItem(
                  cart.id,
                  productId
            );


            if (!existingItem) {
                  throw new Error("Product not found in cart");
            }


            const product = await productRepository.findById(productId);


            if (!product) {
                  throw new Error("Product not found");
            }


            if (quantity > product.quantity) {
                  throw new Error(
                        `Only ${product.quantity} items available`
                  );
            }


            if (quantity < 1) {
                  throw new Error(
                        "Quantity must be at least 1"
                  );
            }


            return cartRepository.updateCartItem(
                  existingItem.id,
                  quantity
            );

      },

      removeFromCart: async (userId: string, productId: string) => {

            const cart: any = await cartRepository.findCartByUserId(userId);

            const existingItem = await cartRepository.findCartItem(
                  cart.id,
                  productId
            );

             if (!existingItem) {
                  throw new Error("Product not found in cart");
            }


            if (existingItem.quantity > 1) {

                  return cartRepository.updateCartItem(
                        existingItem.id,
                        existingItem.quantity - 1
                  );

            }

            return cartRepository.deleteCartItem(existingItem.id);
      },


      clearCart: async (userId: string) => {

            const cart: any = await cartRepository.findCartByUserId(userId);

            if (!cart){

                  throw new Error("Cart not found");
            }
                  

            return cartRepository.clearCart(cart.id);
      }

}