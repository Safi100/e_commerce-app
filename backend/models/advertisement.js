const mongoose = require('mongoose')
const Schema = mongoose.Schema

const advertisementSchema = new Schema({
    image: {
        url: {
            type: String,
            required: true
        },
        filename: {
            type: String,
            required: true
        }
    },
    link: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Advertisement', advertisementSchema)
