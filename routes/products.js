import express from 'express';
import multer from 'multer';
import { productController } from '../controllers/index.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.use('/image/:productId', (req, res, next) => {
    req.isPublic = true;
    next();
});

router.get('/', productController.getAllProducts);
router.patch('/', productController.updateProduct);
router.post('/', upload.single('imagesList'), productController.insertProduct);
router.delete('/:productId', productController.deleteProduct);
router.get('/image/:productId', productController.getProductImage);


export default router;
