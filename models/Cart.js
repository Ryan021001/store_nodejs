import { ObjectId, Schema } from "mongoose"
import mongoose from "mongoose"

const cartSchema = new Schema({
    id: { type: ObjectId },
    productId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
});

const cart = mongoose.model('Cart', cartSchema);

export default cart;
