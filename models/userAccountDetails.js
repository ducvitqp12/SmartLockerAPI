const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const userAccountDetail = new mongoose.Schema({
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
    updatedBy:{
        require: false,
        type: String,
    }, 
    createdBy:{
        require: false, 
        type: String,
        default: "Admin"
    },
    userName:{
        require: true, 
        type: String,
        unique: true
    },
    name:{
        require: false, 
        type: String
    },
    employeeCode:{
        require:false,
        type:String
    },
    codeLogic:{
        require: false,
        type: String
    }
})

module.exports = mongoose.model('UserAccountDetail', userAccountDetail)