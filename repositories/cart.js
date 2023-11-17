import Exception from "../exceptions/Exception.js"
import { Cart } from "../models/index.js"

const getAllCarts = async () => {
    const allCart = await Cart.find()
    return allCart
}
const getCartByUserId = async (userId) => {
    const cart = await Cart.find({ userId })
    if (!cart) {
        throw new Exception('Cannot find cart with id ' + cartId)
    }
    return cart
}

const insertCart = async ({
    productId,
    quantity,
    color,
    userId,
}) => {
    try {
        const existingCart = await Cart.findOne({
            productId: productId,
            color: color,
            userId: userId,
        });

        if (existingCart) {
            const newQuantityRes = Number(quantity) + Number(existingCart.quantity);

            existingCart.quantity = newQuantityRes;
            await existingCart.save();
            return existingCart;
        } else {
            const cart = await Cart.create({
                productId,
                userId,
                quantity,
                color,
            });
            return cart;
        }
    } catch (exception) {
        if (!!exception.errors) {
            throw new Exception('Input error', exception.errors);
        }
    }
}


const deleteCart = async (cartId) => {
    try {
        const cart = await Cart.findByIdAndDelete(cartId);
        if (!cart) {
            throw new Error('cart not found');
        }
        return {
            message: 'Cart deleted successfully',
            data: null,
        };
    } catch (exception) {
        throw new Error('Error deleting cart: ' + exception.message);
    }
};

const updateCart = async ({
    id,
    quantity,
}) => {
    const cart = await Cart.findById(id)
    debugger
    cart.quantity = quantity ?? cart.quantity
    await cart.save()
    return cart
}

export default {
    getAllCarts,
    insertCart,
    getCartByUserId,
    deleteCart,
    updateCart,
}