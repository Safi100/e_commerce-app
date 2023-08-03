const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    CategoryName : {
        type: String,
        required: true,
        unique: true
    },
    categoryImage:{
        url: {
            type: String,
            required: true
        },
        filename: {
            type:String,
            required: true
        },
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product',
        }
    ]
})

module.exports = mongoose.model('Category', CategorySchema)