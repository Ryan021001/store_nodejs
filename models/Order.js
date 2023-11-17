import { ObjectId, Schema } from "mongoose"
import mongoose from "mongoose"

const orderSchema = new Schema({
    id: { type: ObjectId },
    orderDate: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    total: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    cartList: {
        type: String,
        required: true,
    },
    addressId: {
        type: String,
        required: true,
    },
});

const order = mongoose.model('Order', orderSchema);

export default order;
