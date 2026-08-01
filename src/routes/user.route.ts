import { Router } from 'express';
import { userController } from '../controllers/user.controller.ts';
import { authorize, protectedAction } from '../middlewares/protected.middleware.ts';


const router = Router();

router.post('/signup', userController.createUser);

router.post('/login', userController.login);

router.get('/', userController.getAllUsers);

router.get('/:id', protectedAction, userController.getUserById);

router.patch('/:id', protectedAction, authorize('ADMIN'), userController.updateUser);

router.delete('/:id',protectedAction, authorize('ADMIN'),  userController.deleteUser);

const UserRoute = router;

export default UserRoute;