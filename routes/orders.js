import express from 'express';
import { orderController } from '../controllers/index.js';

const router = express.Router();

router.get('/', orderController.getAllOrders);
router.patch('/', orderController.updateOrder);
router.post('/', orderController.insertOrder);
router.delete('/:orderId', orderController.deleteOrder);
router.get('/:userId', orderController.getOrderByUserId);


export default router;
