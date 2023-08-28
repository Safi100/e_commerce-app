const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartItemSchema = new mongoose.Schema({
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', // Assuming you have a 'Product' model
      required: true,
    },
    quantity: {
      type: Number,
      required: true    
    },
  }, {_id: false}, {__v: false});

  const cartSchema = new mongoose.Schema({
    items: [cartItemSchema],
    total: {
      type: Number,
      required: true,
      default: 0,
    },
  }, {_id: false}, {__v:false});

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
        type: cartSchema,
        default: { items: [], total: 0 }, // Initialize cart with empty items array and total of 0
    },
    reviews:[{
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }]
    
}, {timestamps: true})

module.exports = mongoose.model('Customer', CustomerSchema)