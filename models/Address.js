import { ObjectId, Schema } from "mongoose"
import mongoose from "mongoose"

const addressSchema = new Schema({
    id: { type: ObjectId },
    fullName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
});

const address = mongoose.model('Address', addressSchema);

export default address;
