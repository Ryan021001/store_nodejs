import mongoose, {Schema, ObjectId } from 'mongoose'
import isEmail from 'validator/lib/isEmail.js'
export default mongoose.model('User', 
    new Schema({
        user_id: { type: ObjectId},
        name: {
            type: String,
            required: true, //NOT NULL
            validate: {
                validator: (value) => value.length > 3,
                message: 'Username must be at least 3 characters'
            }
        },
        email: {
            type: String, 
            validate: {
                validator: (value) => isEmail,
                message: 'Email is incorrect format'
            }
        },
        password: { 
            type: String, 
            required: true,            
        },     
        default_shipping_id: { 
            type: String, 
            required: false,        
        },
        favoritesList: { 
            type: String, 
            required: false,        
        },
        cartList: { 
            type: String, 
            required: false,        
        },
        Role: { 
            type: String, 
            required: false,        
        },
    })
)
