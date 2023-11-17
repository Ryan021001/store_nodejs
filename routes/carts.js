import express from 'express';
import { cartController } from '../controllers/index.js';

const router = express.Router();

router.get('/', cartController.getAllCarts);
router.patch('/', cartController.updateCart);
router.post('/', cartController.insertCart);
router.delete('/:cartId', cartController.deleteCart);
router.get('/:userId', cartController.getCartByUserId);


export default router;
