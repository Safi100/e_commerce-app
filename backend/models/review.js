const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
       type: String,
       required: true
    },
    image: {
        url: {
            type: String,
            default: ""
        },
        filename: {
            type: String,
            default: ""
        }
    },
    rating : {
       type: Number,
       required: true,
       min: 1,
       max: 5
    },
    author : {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
},
{timestamps: true}
)

module.exports = mongoose.model('Review', ReviewSchema)