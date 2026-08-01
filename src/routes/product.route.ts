import { Router } from 'express';
import upload from '../middlewares/upload.ts';
import { productController } from '../controllers/product.controller.ts';
import { authorize, protectedAction } from '../middlewares/protected.middleware.ts';

const router = Router();

router.post('/', protectedAction, authorize('ADMIN'), upload.array('images', 6), productController.createProduct);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.patch('/:id', protectedAction, authorize('ADMIN'), productController.updateProduct);
router.delete('/:id', protectedAction, authorize('ADMIN'), productController.deleteProduct);

const ProductRoute = router;

export default ProductRoute;