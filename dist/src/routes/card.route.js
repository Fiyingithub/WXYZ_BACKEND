import { Router } from 'express';
import { validateCard } from '../controllers/card.controller.js';
const router = Router();
router.post('/validate', validateCard);
const CardRoute = router;
export default CardRoute;
//# sourceMappingURL=card.route.js.map