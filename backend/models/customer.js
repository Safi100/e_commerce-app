const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CustomerSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    cart: {
        products: [
            {
            id: {
                
                type: Schema.Types.ObjectId,
                ref: 'Product',
            },
            quantity: {

                type: Number,
                default: 1,
                min: 1
            }
        }
    ],
        total: {
            type: Number,
            required: true,
            default: 0
        }
    },
    reviews:[{
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }]
    
}, {timestamps: true})

module.exports = mongoose.model('Customer', CustomerSchema)