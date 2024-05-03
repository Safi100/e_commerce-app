const mongoose = require('mongoose')
const Schema = mongoose.Schema

const passwordTokenSchema = new Schema({
    CustomerId: {
        type: Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
        unique: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date(),
        expires: 3600 // 1 hours
    } 
})

module.exports = mongoose.model('PasswordToken', passwordTokenSchema)