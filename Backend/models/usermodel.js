const mongoose = require('mongoose')
const registerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    email : {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    profession: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const register = mongoose.model('registerDetails', registerSchema)
module.exports = {register}