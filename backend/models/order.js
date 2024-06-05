const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new mongoose.Schema({
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    price_when_order : {
        type: Number,
        required: true,
        min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
  }, {_id: false});

  const addressSchema = new Schema({
    recipient_name: {
      type: String,
      required: true,
    },
    street_address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postal_code: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
  }, {_id: false});

const OrderSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  sessionId: { type: String, required: true, unique: true },
  deliveryCost: { type: Number, required: true, min: 0 },
  address: {type: addressSchema, required: true},
  items: {type: [ItemSchema], required: true},
}, {timestamps: true})

module.exports = mongoose.model('Order', OrderSchema)