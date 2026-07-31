import { Router } from 'express';
import upload from '../middlewares/upload.ts';
import { productController } from '../controllers/product.controller.ts';

const router = Router();

router.post('/', upload.array('images', 5), productController.createProduct);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.patch('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

const ProductRoute = router;

export default ProductRoute;