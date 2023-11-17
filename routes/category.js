import express from 'express';
import multer from 'multer';
import { categoryController } from '../controllers/index.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.use('/image/:categoryId', (req, res, next) => {
    req.isPublic = true;
    next();
});

router.get('/', categoryController.getAllCategory);
router.patch('/', upload.single('imagesList'), categoryController.updateCategory);
router.post('/', upload.single('imagesList'), categoryController.insertCategory);
router.delete('/:categoryId', categoryController.deleteCategory);
router.get('/image/:categoryId', categoryController.getCategoryImage);


export default router;
