const mongoose = require('mongoose')
const employeeData = new mongoose.Schema({
    name: String,
    sick: Number,
    casual: Number,
    earned: Number,
    total: Number,
    availed: Number,
    balance: Number
})
module.exports = mongoose.model('employeeData', employeeData)