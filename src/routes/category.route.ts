import { Router } from 'express';
import { categoryController } from '../controllers/category.controller.ts';
import { authorize, protectedAction } from '../middlewares/protected.middleware.ts';
import upload from '../middlewares/upload.ts';
import { validateSchema } from "../middlewares/validateSchema.ts";
import { createCategorySchema } from '../validators/category/createCategory.validator.ts';


const router = Router();

router.post('/', validateSchema(createCategorySchema), protectedAction, authorize('ADMIN'), upload.single('image'), categoryController.create);

router.get('/', categoryController.getAll);

router.get('/:id', categoryController.getById);

router.patch('/:id', protectedAction, authorize('ADMIN'), categoryController.update);

router.delete('/:id', protectedAction, authorize('ADMIN'), categoryController.delete);


const CategoryRoute = router;

export default CategoryRoute;