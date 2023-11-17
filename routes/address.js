import express from 'express';
import { addressController } from '../controllers/index.js';

const router = express.Router();

router.get('/', addressController.getAllAddress);
router.patch('/', addressController.updateAddress);
router.post('/', addressController.insertAddress);
router.delete('/:addressId', addressController.deleteAddress);
router.get('/:userId', addressController.getAddressByUserId);
router.get('/id/:id', addressController.getAddressById);



export default router;
