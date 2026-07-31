import { Router } from 'express';
import { categoryController } from '../controllers/category.controller.ts';

const router = Router();

router.post('/', categoryController.create);
router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getById);
router.patch('/:id', categoryController.update);
router.delete('/:id', categoryController.delete);


const CategoryRoute = router;

export default CategoryRoute;