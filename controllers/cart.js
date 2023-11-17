import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import { cartRepository } from '../repositories/index.js'

async function getAllCarts(req, res) {
    try {
        const filteredCarts = await cartRepository.getAllCarts()
        res.status(HttpStatusCode.OK).json({
            message: 'Get Carts successfully',
            data: filteredCarts,
        })
    } catch (Exception) {
        res.status(HttpStatusCode.InternalServerError).json({
            message: exception.message,
        })
    }
}

async function getCartByUserId(req, res) {
    debugger
    try {
        const userId = req.params.userId;
        const filteredCarts = await cartRepository.getCartByUserId(userId)
        res.status(HttpStatusCode.OK).json({
            message: 'Get Carts successfully',
            data: filteredCarts,
        })
    } catch (exception) {
        res.status(HttpStatusCode.InternalServerError).json({
            message: exception.message,
        })
    }
}

async function updateCart(req, res) {
    try {
        debugger
        const cart = await cartRepository.updateCart(req.body)
        res.status(HttpStatusCode.OK).json({
            message: 'Update cart successfully',
            data: cart,
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.message,
        })
    }
}

const insertCart = async (req, res) => {
    try {
        debugger
        const {
            productId,
            quantity,
            color,
            userId,
        } = req.body;

        const cart = await cartRepository.insertCart({
            productId,
            quantity,
            color,
            userId,
        });

        res.status(HttpStatusCode.INSERT_OK).json({
            message: 'Insert Cart successfully',
            data: cart,
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot insert Cart:' + exception,
            validationErrors: exception.validationErrors,
        });
    }
};

async function deleteCart(req, res) {
    try {
        const cartId = req.params.cartId;
        const result = await cartRepository.deleteCart(cartId);
        res.status(HttpStatusCode.OK).json(result);
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot delete Cart:' + exception.message,
        });
    }
}


export default {
    getCartByUserId,
    getAllCarts,
    updateCart,
    deleteCart,
    insertCart,
}