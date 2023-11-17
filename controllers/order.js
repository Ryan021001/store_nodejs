import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import { orderRepository } from '../repositories/index.js'

async function getAllOrders(req, res) {
    try {
        const filteredOrders = await orderRepository.getAllOrders()
        res.status(HttpStatusCode.OK).json({
            message: 'Get Orders successfully',
            data: filteredOrders,
        })
    } catch (Exception) {
        res.status(HttpStatusCode.InternalServerError).json({
            message: exception.message,
        })
    }
}

async function getOrderByUserId(req, res) {
    debugger
    try {
        const userId = req.params.userId;
        const filteredOrders = await orderRepository.getOrderByUserId(userId)
        res.status(HttpStatusCode.OK).json({
            message: 'Get Orders successfully',
            data: filteredOrders,
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.message,
        })
    }
}

async function updateOrder(req, res) {
    try {
        debugger
        const Order = await orderRepository.updateOrder(req.body)
        res.status(HttpStatusCode.OK).json({
            message: 'Update Order successfully',
            data: Order,
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.message,
        })
    }
}

const insertOrder = async (req, res) => {
    try {
        debugger
        const {
            orderDate,
            quantity,
            total,
            status,
            userId,
            cartList,
            addressId,
        } = req.body;

        const order = await orderRepository.insertOrder({
            orderDate,
            quantity,
            total,
            status,
            userId,
            cartList,
            addressId,
        });

        res.status(HttpStatusCode.INSERT_OK).json({
            message: 'Insert Order successfully',
            data: order,
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot insert Order:' + exception,
            validationErrors: exception.validationErrors,
        });
    }
};

async function deleteOrder(req, res) {
    try {
        const orderId = req.params.orderId;
        const result = await orderRepository.deleteOrder(orderId);
        res.status(HttpStatusCode.OK).json(result);
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot delete Order:' + exception.message,
        });
    }
}


export default {
    getOrderByUserId,
    getAllOrders,
    updateOrder,
    deleteOrder,
    insertOrder,
}