import express from 'express';
import UserRoute from './user.route.ts';
import ProductRoute from './product.route.ts';
import CategoryRoute from './category.route.ts';
import CartRoute from './cart.route.ts';
import AddressRoute from './address.route.ts';


const router = express.Router()

router.use('/user', UserRoute)

router.use('/address', AddressRoute)

router.use('/product', ProductRoute)

router.use('/category', CategoryRoute)

router.use('/cart', CartRoute)



const routes = router;
export default routes