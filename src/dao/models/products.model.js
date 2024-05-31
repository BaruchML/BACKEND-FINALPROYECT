import { Schema, model } from 'mongoose'

const productsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
    },
    imgUrl: {
        type: String,
    },
    stock: {
        type: Number
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },

    owner: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    isActive: {
        type: Boolean,
        default: true,
    }

})

productsSchema.methods.toJSON = function(){
    const {__v, isActive, ...data} = this.toObject()
    return data
} 

export default model('products', productsSchema)