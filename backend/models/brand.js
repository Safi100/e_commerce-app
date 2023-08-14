const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BrandSchema = new Schema({
    BrandName: {
        type: String,
        required: true,
        unique: true
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product',
        }
    ]
})

module.exports = mongoose.model('Brand', BrandSchema)