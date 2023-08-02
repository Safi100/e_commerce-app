const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    discount:{
        type: Number,
        min: 0,
        max: 99,
        default: 0
    },
    priceToPay : {
        type: Number,
        required: true,
        min: 0,
        default: function () {
            return this.price - (this.discount / 100) * this.price;
        }
    },
    images:[
        {
            url: {
                type: String,
                default: ""
            },
            filename: {
                type: String,
                default: ""
            }
        }
    ],
    chose_for_you:{
        type: Boolean,
        default: false
    },
    still_available:{
        type: Boolean,
        default: true
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    brand:{
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: true,
    },
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
},
{timestamps: true}
)

module.exports = mongoose.model('Product', ProductSchema)