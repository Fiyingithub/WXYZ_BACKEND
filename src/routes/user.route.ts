import { Router } from 'express';
import { userController } from '../controllers/user.controller.ts';



const router = Router();




router.post('/signup', userController.createUser);

router.post('/login', userController.login);

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUserById);

router.patch('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

const UserRoute = router;

export default UserRoute;