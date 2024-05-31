import { Schema, model } from "mongoose";


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

const collection = 'ticket'

const ticketScheema = new Schema({

    code: {
        type: String,
        auto: true,
        default: getRandomInt(10000000, 9999999999)
    },
    purchase_date: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        // type: Schema.Types.ObjectId,
        // ref: 'users'
        type: String

    },
    productsPurchased: {
        type: Array
    }

})
ticketScheema.pre('findOne', function () {
    this.populate('users.user')
})

export default model(collection, ticketScheema)