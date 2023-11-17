import { ObjectId, Schema } from "mongoose"
import mongoose from "mongoose"

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    colorList: {
        type: String,
    },
    price: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    categoryId: {
        type: String,
    },
    imagesList: {
        type: Buffer,
    },
    createAt: {
        type: String,
    },
});

const product = mongoose.model('Product', productSchema);

export default product;
