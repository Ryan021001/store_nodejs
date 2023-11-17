import express from 'express'
import { body } from 'express-validator'
import {
    userController
} from '../controllers/index.js'

const router = express.Router()
router.get('/:id', userController.getDetailUser)
router.delete('/:id', userController.deleteUser)
router.post('/login',
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    userController.login
)
router.post('/register', userController.register)
router.patch('/', userController.updateAddressUser)
router.get('/', userController.getAllUser)
router.patch('/favorite', userController.updateFavoriteUser)
export default router
