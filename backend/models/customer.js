const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartItemSchema = new mongoose.Schema({
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
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
      min: 0
    },
  }, {_id: false}, {__v:false});

  const addressSchema = new Schema({
    recipient_name: {
      type: String,
      required: [true, 'Recipient name is required!']
    },
    street_address: {
      type: String,
      required: [true, 'Street address is required!']
    },
    city: {
      type: String,
      required: [true, 'City is required!']
    },
    postal_code: {
      type: String,
      required: [true, 'Postal code is required!']
    },
    phone_number: {
      type: String,
      required: [true, 'Phone number is required!']
    },
  }, {_id: false}, {__v:false});

const CustomerSchema = new Schema({
    first_name: {
        type: String,
        required: [true, 'First name is required!']
    },
    last_name: {
        type: String,
        required: [true, 'Last name is required!']
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    cart: {
        type: cartSchema,
        default: { items: [], total: 0 }, // Initialize cart with empty items array and total of 0
    },
    address: {
      type: addressSchema,
      default: null,
    },
    reviews:[{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
    
}, {timestamps: true})

module.exports = mongoose.model('Customer', CustomerSchema)