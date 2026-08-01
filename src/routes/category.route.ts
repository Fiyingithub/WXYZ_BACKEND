import { Router } from 'express';
import { categoryController } from '../controllers/category.controller.ts';
import { authorize, protectedAction } from '../middlewares/protected.middleware.ts';

const router = Router();

router.post('/', protectedAction, authorize('ADMIN'), categoryController.create);
router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getById);
router.patch('/:id', protectedAction, authorize('ADMIN'), categoryController.update);
router.delete('/:id', protectedAction, authorize('ADMIN'), categoryController.delete);


const CategoryRoute = router;

export default CategoryRoute;