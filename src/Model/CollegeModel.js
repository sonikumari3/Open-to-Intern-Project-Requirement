const mongoose = require('mongoose')

const clgSchehema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    fullName: {
        type: String,
        trim: true,
        required: true
    },
    logoLink: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


module.exports = mongoose.model('college', clgSchehema)


