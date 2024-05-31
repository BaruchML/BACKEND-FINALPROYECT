import { Schema, model } from 'mongoose'
// import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
const usersCollection = 'users'

const userSchema = new Schema({

    first_name: {
        type: String,
        index: true,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    full_name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    carts: {
        type: [{
            cart: {
                type: Schema.Types.ObjectId,
                ref: 'carts'
            }
        }],
    },
    role: {
        type: String,
        enum: ['user', 'admin','premium'],
        default: 'user'
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isPremium: {
        type: Boolean,
        default: false,
    },
    documents:{
        type: Array,        
    },
    thumbnail:{
        type:String
    }
})

userSchema.pre('findOne', function () {
    this.populate('carts.cart')
})
// userSchema.plugin(mongoosePaginate)


export default model(usersCollection, userSchema)