import { ObjectId, Schema } from "mongoose"
import mongoose from "mongoose"

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    imagesList: {
        type: Buffer,
    },
});

const category = mongoose.model('Category', categorySchema);

export default category;
