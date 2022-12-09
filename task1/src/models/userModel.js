const mongoose=require('mongoose')


const userModel = new mongoose.Schema({
    fname: {type: String, required: true},
    lname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 8, max: 15 } // encrypted password


}, {timestamps: true})

module.exports = mongoose.model('User', userModel)