import express from 'express'
import { protectedAction } from '../middlewares/protected.middleware.ts'
import { cartController } from '../controllers/cart.controller.ts';


const router = express.Router()

router.use(protectedAction)


router.post("/", cartController.addToCart);

router.get("/", cartController.getCartByUserId);

router.patch("/", cartController.updateQuantity);

router.delete("/:productId", cartController.removeItem);

router.delete("/", cartController.clearCart);


const CartRoute = router;
export default CartRoute