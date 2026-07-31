import express from 'express';
import UserRoute from './user.route.ts';
import ProductRoute from './product.route.ts';
import CategoryRoute from './category.route.ts';


const router = express.Router()

router.use('/user', UserRoute)

router.use('/product', ProductRoute)

router.use('/category', CategoryRoute)



const routes = router;
export default routes